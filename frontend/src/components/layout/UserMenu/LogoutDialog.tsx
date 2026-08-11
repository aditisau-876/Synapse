interface Props {
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export default function LogoutDialog({
  open,
  onClose,
  onLogout,
}: Props) {
  if (!open) return null;

  return (
    <div
      className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/50
      "
    >
      <div className="w-96 rounded-2xl bg-background p-6 shadow-2xl">

        <h2 className="text-xl font-bold">
          Logout?
        </h2>

        <p className="mt-2 text-muted-foreground">
          Are you sure you want to logout?
        </p>

        <div className="mt-6 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-xl border px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={onLogout}
            className="rounded-xl bg-red-500 px-4 py-2 text-white"
          >
            Logout
          </button>

        </div>

      </div>
    </div>
  );
}