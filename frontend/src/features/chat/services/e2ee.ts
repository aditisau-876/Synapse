const encoder = new TextEncoder();
const decoder = new TextDecoder();

function toBase64(bytes: ArrayBuffer | Uint8Array) {
  const data = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let binary = "";
  for (const byte of data) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function fromBase64(value: string) {
  const binary = atob(value);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

export async function generateIdentityKeyPair() {
  return crypto.subtle.generateKey(
    { name: "ECDH", namedCurve: "P-256" },
    true,
    ["deriveKey", "deriveBits"],
  );
}

export async function exportPublicKey(key: CryptoKey) {
  const raw = await crypto.subtle.exportKey("raw", key);
  return toBase64(raw);
}

export async function importPublicKey(value: string) {
  return crypto.subtle.importKey(
    "raw",
    fromBase64(value),
    { name: "ECDH", namedCurve: "P-256" },
    true,
    [],
  );
}

async function deriveConversationKey(privateKey: CryptoKey, peerPublicKey: CryptoKey) {
  const bits = await crypto.subtle.deriveBits(
    { name: "ECDH", public: peerPublicKey },
    privateKey,
    256,
  );
  return crypto.subtle.importKey(
    "raw",
    await crypto.subtle.digest("SHA-256", bits),
    { name: "AES-GCM" },
    false,
    ["encrypt", "decrypt"],
  );
}

export async function encryptMessage(
  privateKey: CryptoKey,
  peerPublicKey: CryptoKey,
  plaintext: string,
) {
  const key = await deriveConversationKey(privateKey, peerPublicKey);
  const nonce = crypto.getRandomValues(new Uint8Array(12));
  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: nonce },
    key,
    encoder.encode(plaintext),
  );

  return {
    ciphertext: toBase64(ciphertext),
    nonce: toBase64(nonce),
  };
}

export async function decryptMessage(
  privateKey: CryptoKey,
  senderPublicKey: CryptoKey,
  ciphertext: string,
  nonce: string,
) {
  const key = await deriveConversationKey(privateKey, senderPublicKey);
  const plaintext = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: fromBase64(nonce) },
    key,
    fromBase64(ciphertext),
  );
  return decoder.decode(plaintext);
}

export async function fingerprintPublicKey(publicKey: string) {
  const digest = await crypto.subtle.digest("SHA-256", fromBase64(publicKey));
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}


const KEY_DB = "synapse-e2ee";
const KEY_STORE = "identity";

function openKeyDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(KEY_DB, 1);
    request.onupgradeneeded = () => { if (!request.result.objectStoreNames.contains(KEY_STORE)) request.result.createObjectStore(KEY_STORE); };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function loadOrCreateIdentityKeyPair() {
  const db = await openKeyDb();
  const existing = await new Promise<CryptoKeyPair | undefined>((resolve, reject) => {
    const req = db.transaction(KEY_STORE, "readonly").objectStore(KEY_STORE).get("identity");
    req.onsuccess = () => resolve(req.result); req.onerror = () => reject(req.error);
  });
  if (existing?.privateKey && existing?.publicKey) return existing;
  const pair = await generateIdentityKeyPair();
  await new Promise<void>((resolve, reject) => {
    const req = db.transaction(KEY_STORE, "readwrite").objectStore(KEY_STORE).put(pair, "identity");
    req.onsuccess = () => resolve(); req.onerror = () => reject(req.error);
  });
  return pair;
}

export async function getIdentityPublicKey() {
  const pair = await loadOrCreateIdentityKeyPair();
  return exportPublicKey(pair.publicKey);
}
