export default function MeetingSummary() {
  return (
    <div
      className="
      rounded-3xl
      border
      border-white/10
      bg-white/5
      p-6
      "
    >
      <h3 className="mb-4 text-xl font-bold text-white">
        AI Summary
      </h3>

      <p className="leading-8 text-white/70">
        Alex reviewed the dashboard progress.
        Sarah completed the authentication flow.
        Emily will begin backend integration.
      </p>
    </div>
  );
}