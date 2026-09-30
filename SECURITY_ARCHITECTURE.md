# Synapse security architecture

## Authentication
- Memory-hard scrypt password hashing with per-password random salts.
- Short-lived JWT access tokens and rotating, revocable refresh tokens.
- Email OTP verification and phone OTP verification endpoints.
- Device-session records and logout/audit events.
- Production deployment must use HTTPS, secure HttpOnly cookies for refresh tokens, rate limiting, CSRF protection where cookie auth is used, and a real email/SMS provider.

## End-to-end encryption
The backend's encrypted-message API accepts ciphertext, nonce and public-key material and does not decrypt message content. The frontend includes a Web Crypto ECDH P-256 + AES-GCM helper.

This is a secure foundation, **not a Signal-protocol implementation**. Before claiming WhatsApp/Signal-level E2EE, add a mature audited protocol/library with:
- per-device identity keys
- signed prekeys and one-time prekeys
- session ratcheting / forward secrecy
- post-compromise recovery
- multi-device key management
- safety-number/key-change verification
- encrypted attachment keys and thumbnails
- secure IndexedDB key storage
- external security review

## Blockchain
Synapse does not put private data on a blockchain. The backend maintains a tamper-evident hash chain for security/audit events. `blockchain/SynapseAuditAnchor.sol` can anchor the latest root hash to an EVM chain later.

Only commitments belong on-chain. Message bodies, metadata that can identify users, encryption keys and files must remain off-chain.

## AI and retention
AI summaries should be generated from the minimum required context. Meeting summaries should have an explicit retention deadline. The 7-day UI retention policy should be enforced server-side with scheduled deletion, not only by hiding records in the client.

## Production checklist
1. Replace development JWT secret.
2. Set `DEV_OTP=false` and configure email/SMS delivery.
3. Use PostgreSQL and encrypted backups.
4. Put refresh tokens in Secure + HttpOnly + SameSite cookies.
5. Add per-IP and per-account rate limits for auth/OTP.
6. Add CSP, HSTS, secure headers and dependency scanning.
7. Add WebRTC DTLS-SRTP for calls and authenticate signaling.
8. Add an audited E2EE protocol before production.
9. Threat-model chat, meetings, files and AI separately.
10. Pen-test before launch.
