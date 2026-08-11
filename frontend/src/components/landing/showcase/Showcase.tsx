import {
  MessageCircle,
  Video,
  Pencil,
} from "lucide-react";

import ShowcaseCard from "./ShowcaseCard";

export default function Showcase() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-32">

      <div className="mb-20 text-center">

        <p className="font-semibold text-[var(--synapse-accent-500)]">
          EXPERIENCE
        </p>

        <h2 className="mt-4 text-5xl font-black">
          Built for modern communication
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
          Everything your team needs in one connected workspace.
        </p>

      </div>


      <div className="space-y-10">


        <ShowcaseCard
          title="Chat like WhatsApp"
          description="Fast messaging with reactions, media sharing, typing indicators and read receipts."
        >

          <div className="flex h-72 items-center justify-center rounded-3xl bg-muted">

            <MessageCircle className="size-24 text-[var(--synapse-accent-500)]" />

          </div>

        </ShowcaseCard>



        <ShowcaseCard
          title="Meet like Google Meet"
          description="HD video meetings with screen sharing, recording and collaboration tools."
        >

          <div className="flex h-72 items-center justify-center rounded-3xl bg-muted">

            <Video className="size-24 text-[var(--synapse-accent-500)]" />

          </div>

        </ShowcaseCard>



        <ShowcaseCard
          title="Collaborate with Whiteboard"
          description="Draw, plan and brainstorm together during meetings."
        >

          <div className="flex h-72 items-center justify-center rounded-3xl bg-muted">

            <Pencil className="size-24 text-[var(--synapse-accent-500)]" />

          </div>

        </ShowcaseCard>


      </div>

    </section>
  );
}