import * as AlertDialog from "@radix-ui/react-alert-dialog";

interface Props {
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export default function LogoutDialog({ open, onClose, onLogout }: Props) {
  return (
    <AlertDialog.Root open={open} onOpenChange={(o: boolean) => !o && onClose()}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="animate-fade fixed inset-0 z-[70] bg-black/50" />
        <AlertDialog.Content className="animate-pop fixed left-1/2 top-1/2 z-[71] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-popover p-6 shadow-2xl">
          <AlertDialog.Title className="font-display text-lg font-semibold">
            Sign out of Synapse?
          </AlertDialog.Title>
          <AlertDialog.Description className="mt-2 text-sm text-muted-foreground">
            You'll need to sign in again to read your messages. Your chats stay
            encrypted on the server.
          </AlertDialog.Description>
          <div className="mt-6 flex justify-end gap-2">
            <AlertDialog.Cancel className="h-9 rounded-lg border border-border px-4 text-sm font-medium hover:bg-muted">
              Stay signed in
            </AlertDialog.Cancel>
            <AlertDialog.Action
              onClick={onLogout}
              className="h-9 rounded-lg bg-destructive px-4 text-sm font-medium text-white hover:opacity-90"
            >
              Sign out
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
