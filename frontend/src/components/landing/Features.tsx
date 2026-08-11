import FeatureCard from "./FeatureCard";
import { features } from "./feature-data";

export default function Features() {
  return (
    <section
      id="features"
      className="mx-auto max-w-7xl px-6 py-32"
    >
      <div className="mb-20 text-center">

        <p className="font-semibold text-[var(--synapse-accent-500)]">
          FEATURES
        </p>

        <h2 className="mt-4 text-5xl font-black">
          Everything you need.
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          One platform for messaging, meetings and collaboration.
        </p>

      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            {...feature}
          />
        ))}

      </div>
    </section>
  );
}