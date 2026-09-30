import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AuthLayout from "@/features/auth/components/AuthLayout";
import AuthCard from "@/features/auth/components/AuthCard";
import PasswordInput from "@/features/auth/components/PasswordInput";
import OTPInput from "@/features/auth/components/OTPInput";
import { Button } from "@/components/ui/button";
import { resetPassword } from "@/features/auth/api/auth-api";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { challengeId?: string; devCode?: string } | null;
  const [code, setCode] = useState(state?.devCode ?? "");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const submit = async () => {
    if (!state?.challengeId || code.length !== 6) return toast.error("Enter the reset code");
    if (password.length < 8) return toast.error("Password must be at least 8 characters");
    if (password !== confirm) return toast.error("Passwords do not match");
    setLoading(true);
    try { await resetPassword(state.challengeId, code, password); toast.success("Password reset successfully"); navigate("/login", { replace: true }); }
    catch (error) { toast.error(error instanceof Error ? error.message : "Unable to reset password"); }
    finally { setLoading(false); }
  };
  return <AuthLayout><AuthCard title="Create New Password" description="Enter the verification code and choose a new password."><div className="space-y-5"><OTPInput value={code} onChange={setCode}/><PasswordInput value={password} onChange={setPassword} placeholder="New password"/><PasswordInput value={confirm} onChange={setConfirm} placeholder="Confirm password"/><Button className="h-12 w-full" disabled={loading} onClick={submit}>{loading ? "Resetting..." : "Reset Password"}</Button></div></AuthCard></AuthLayout>;
}
