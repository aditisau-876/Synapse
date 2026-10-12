export default function Security() {
  return (
    <section id="security" className="scroll-mt-20 px-5 py-20">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold sm:text-4xl">
            Your messages are yours to read
          </h2>
          <p className="mt-4 max-w-md text-lg text-muted-foreground">
            We built Synapse so that the server only ever sees scrambled text. Not us,
            not anyone who gets into our database.
          </p>
        </div>

        <ol className="space-y-6">
          {[
            ["Keys stay on your device", "Each device creates its own key pair. The private half never leaves your browser."],
            ["Encrypted before sending", "Messages are sealed with a key only you and the recipient can derive (ECDH P-256 with AES-GCM)."],
            ["Check it yourself", "Open any chat's details to compare a security code with the other person and confirm nobody is in the middle."],
          ].map(([title, body], i) => (
            <li key={title} className="flex gap-4">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--synapse-accent-500)] text-sm font-bold text-white">
                {i + 1}
              </span>
              <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-1 text-[15px] text-muted-foreground">{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
