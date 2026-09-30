import { Monitor, Smartphone, Laptop, LogOut, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getSessions, revokeAllSessions, revokeSession } from "@/features/auth/api/auth-api";
import { useAuthStore } from "@/features/auth/store/auth-store";

function iconFor(name: string) { return /android|iphone|mobile/i.test(name) ? Smartphone : /mac|laptop/i.test(name) ? Laptop : Monitor; }
function relativeTime(value: string) { const diff = Date.now() - new Date(value).getTime(); if (diff < 60_000) return "Active now"; const mins = Math.floor(diff / 60000); if (mins < 60) return `${mins} min ago`; const hours = Math.floor(mins / 60); if (hours < 24) return `${hours}h ago`; return `${Math.floor(hours / 24)}d ago`; }

export default function SessionsSettingsPage() {
  const currentSessionId = useAuthStore((s) => s.sessionId);
  const [sessions, setSessions] = useState<Array<{id:string;device_name:string;last_active:string;created_at:string}>>([]);
  const [loading, setLoading] = useState(true);
  const load = async () => { try { setSessions(await getSessions()); } catch (e) { toast.error(e instanceof Error ? e.message : "Unable to load sessions"); } finally { setLoading(false); } };
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { void load(); }, []);
  const signOut = async (id: string) => { try { await revokeSession(id); setSessions((items) => items.filter((s) => s.id !== id)); toast.success("Session revoked"); } catch (e) { toast.error(e instanceof Error ? e.message : "Unable to revoke session"); } };
  const signOutAll = async () => { try { await revokeAllSessions(); await load(); toast.success("Other sessions revoked"); } catch (e) { toast.error(e instanceof Error ? e.message : "Unable to revoke sessions"); } };
  return <div className="space-y-8">
    <div><h1 className="text-2xl font-bold">Active Sessions</h1><p className="mt-1 text-sm text-muted-foreground">Review the devices currently signed in to your Synapse account.</p></div>
    <div className="flex gap-3 rounded-2xl border border-primary/20 bg-primary/10 p-4"><ShieldCheck size={20} className="mt-0.5 shrink-0 text-primary"/><div><p className="font-medium">Keep your account secure</p><p className="mt-1 text-sm text-muted-foreground">If you don't recognize a device, revoke it and change your password.</p></div></div>
    <section className="rounded-3xl border border-border bg-card p-6"><div className="mb-6"><h2 className="text-lg font-semibold">Your devices</h2><p className="mt-1 text-sm text-muted-foreground">Sessions are loaded from the Synapse security backend.</p></div>{loading ? <p className="text-sm text-muted-foreground">Loading sessions...</p> : <div className="space-y-3">{sessions.map((session) => { const Icon=iconFor(session.device_name); const current=session.id===currentSessionId; return <div key={session.id} className="flex items-center gap-4 rounded-2xl border border-border p-4 hover:bg-muted/40"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground"><Icon size={21}/></div><div className="min-w-0 flex-1"><div className="flex items-center gap-2"><h3 className="font-medium">{session.device_name}</h3>{current && <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600">Current</span>}</div><p className="mt-1 text-xs text-muted-foreground">Last active {relativeTime(session.last_active)}</p></div>{!current && <button type="button" onClick={() => void signOut(session.id)} className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-500/10"><LogOut size={16}/>Sign out</button>}</div>; })}</div>}</section>
    <section className="rounded-3xl border border-red-500/20 bg-red-500/5 p-6"><h2 className="font-semibold">Sign out of all devices</h2><p className="mt-1 text-sm text-muted-foreground">Revoke every active refresh session. You will need to sign in again on other devices.</p><button type="button" onClick={() => void signOutAll()} className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">Revoke all sessions</button></section>
  </div>;
}
