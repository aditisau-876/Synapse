import { useState } from "react";
import { Eye, EyeOff, KeyRound, X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ChangePasswordDialog({
  open,
  onClose,
}: Props) {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  if (!open) return null;

  const passwordsMatch =
    newPassword === confirmPassword;

  function handleSubmit() {
    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      return;
    }

    if (!passwordsMatch) {
      return;
    }

    console.log("Password change UI submitted");

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    onClose();
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-border bg-background p-6 shadow-2xl">

        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--synapse-accent-500)]/10 text-[var(--synapse-accent-500)] dark:text-[var(--synapse-accent-500)]">
              <KeyRound size={20} />
            </div>

            <div>
              <h2 className="text-xl font-bold">
                Change Password
              </h2>

              <p className="text-sm text-muted-foreground">
                Update your Synapse password.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">

          <PasswordField
            label="Current password"
            value={currentPassword}
            onChange={setCurrentPassword}
            visible={showCurrent}
            onToggle={() =>
              setShowCurrent(!showCurrent)
            }
          />

          <PasswordField
            label="New password"
            value={newPassword}
            onChange={setNewPassword}
            visible={showNew}
            onToggle={() =>
              setShowNew(!showNew)
            }
          />

          <PasswordField
            label="Confirm new password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            visible={showConfirm}
            onToggle={() =>
              setShowConfirm(!showConfirm)
            }
          />

          {confirmPassword && !passwordsMatch && (
            <p className="text-sm text-red-500">
              Passwords do not match.
            </p>
          )}

        </div>

        <div className="mt-7 flex justify-end gap-3">

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-border px-4 py-2.5 text-sm font-medium transition hover:bg-muted"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={
              !currentPassword ||
              !newPassword ||
              !confirmPassword ||
              !passwordsMatch
            }
            onClick={handleSubmit}
            className="rounded-xl bg-[var(--synapse-accent-500)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--synapse-accent-700)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Change Password
          </button>

        </div>

      </div>
    </div>
  );
}

interface PasswordFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  visible: boolean;
  onToggle: () => void;
}

function PasswordField({
  label,
  value,
  onChange,
  visible,
  onToggle,
}: PasswordFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">
        {label}
      </label>

      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          className="w-full rounded-xl border border-border bg-background px-4 py-3 pr-12 text-sm outline-none transition focus:border-[var(--synapse-accent-500)] focus:ring-2 focus:ring-[var(--synapse-accent-500)]/20"
          placeholder="••••••••"
        />

        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          {visible ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>
      </div>
    </div>
  );
}