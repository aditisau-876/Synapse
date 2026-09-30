import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AuthLayout from "@/features/auth/components/AuthLayout";
import AuthCard from "@/features/auth/components/AuthCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { forgotPassword } from "@/features/auth/api/auth-api";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [loading, setLoading] = useState(false);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); if (!identifier.trim()) return;
    setLoading(true);
    try {
      const result = await forgotPassword(identifier.trim());
      toast.success(result.dev_code ? `Development reset code: ${result.dev_code}` : "If the account exists, a reset code has been sent.");
      if (result.challenge_id) navigate("/reset-password", { state: { challengeId: result.challenge_id, devCode: result.dev_code } });
    } catch (error) { toast.error(error instanceof Error ? error.message : "Unable to start password reset"); }
    finally { setLoading(false); }
  };
  return <AuthLayout><AuthCard title="Forgot Password?" description="Request a secure password reset code."><form onSubmit={submit} className="space-y-5"><Input value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder="Email address or phone number" className="h-12" autoComplete="username"/><Button className="h-12 w-full" disabled={loading}>{loading ? "Sending..." : "Send Reset Code"}</Button><p className="text-center text-sm text-muted-foreground">Remember your password?<Link to="/login" className="ml-2 text-[var(--synapse-accent-500)]">Login</Link></p></form></AuthCard></AuthLayout>;
}
