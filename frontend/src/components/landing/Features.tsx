const features = [
  { title: "Private by default", body: "Direct messages are encrypted on your device before they leave it. Verify a security code to be sure who you're talking to." },
  { title: "Meet from a link", body: "Share a link and people join from their browser. Check your camera and mic first, then walk in when you're ready." },
  { title: "Present and react", body: "Share your screen, raise a hand, drop a reaction, or chat on the side without interrupting whoever is speaking." },
  { title: "Tasks beside the talk", body: "Turn what was decided into a card on a board, without copying it into another tool." },
  { title: "A whiteboard for the rest", body: "Sketch an idea while you're talking it through. Some things are faster to draw than to describe." },
  { title: "An assistant when you want one", body: "Draft, summarize and think out loud in the AI workspace, kept apart from your conversations." },
];

export default function Features() {
  return (
    <section id="features" className="scroll-mt-20 border-t border-border bg-card px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="max-w-xl text-3xl font-bold sm:text-4xl">
          Everything a conversation needs, in one tab
        </h2>

        <dl className="mt-12 grid gap-x-10 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="border-t border-border py-6">
              <dt className="text-lg font-semibold">{f.title}</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{f.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
