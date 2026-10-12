export default function JoinMeetingDialog() {

  return (

    <div
      className="
      rounded-3xl
      border
      border-border
      bg-background
      p-8
      shadow-xl
      "
    >

      <h2 className="mb-6 text-2xl font-bold">
        Join Meeting
      </h2>

      <input
        placeholder="Meeting code"
        className="
        mb-6
        w-full
        rounded-xl
        border
        p-3
        "
      />

      <button
        className="
        w-full
        rounded-xl
        bg-[var(--synapse-accent-500)]
        py-3
        text-white
        "
      >
        Join Meeting
      </button>

    </div>

  );

}