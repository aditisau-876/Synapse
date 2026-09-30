import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AuthLayout from "@/features/auth/components/AuthLayout";
import AuthCard from "@/features/auth/components/AuthCard";
import OTPInput from "@/features/auth/components/OTPInput";
import { Button } from "@/components/ui/button";
import { requestPhoneOtp, verifyPhone } from "@/features/auth/api/auth-api";
import { useAuthStore } from "@/features/auth/store/auth-store";

export default function VerifyPhonePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const updateUser = useAuthStore((s) => s.updateUser);
  const [challengeId, setChallengeId] = useState((location.state as { challengeId?: string } | null)?.challengeId ?? "");
  const [code, setCode] = useState((location.state as { devCode?: string } | null)?.devCode ?? "");
  const [loading, setLoading] = useState(false);

  const request = async () => {
    try {
      const result = await requestPhoneOtp();
      setChallengeId(result.challenge_id);
      setCode(result.dev_code ?? "");
      toast.success(result.dev_code ? `Development OTP: ${result.dev_code}` : "Verification code sent");
    } catch (error) { toast.error(error instanceof Error ? error.message : "Unable to send OTP"); }
  };

  const submit = async () => {
    if (!challengeId || code.length !== 6) return toast.error("Enter the 6-digit code");
    setLoading(true);
    try {
      const result = await verifyPhone(challengeId, code);
      updateUser({ phoneVerified: true, ...(result.user ?? {}) });
      toast.success("Phone verified");
      navigate("/app/settings", { replace: true });
    } catch (error) { toast.error(error instanceof Error ? error.message : "Verification failed"); }
    finally { setLoading(false); }
  };

  return <AuthLayout><AuthCard title="Verify Phone Number" description="Confirm the phone number attached to your Synapse account.">
    <div className="space-y-6">
      <OTPInput value={code} onChange={setCode} />
      <Button className="h-12 w-full" disabled={loading} onClick={submit}>{loading ? "Verifying..." : "Verify Phone"}</Button>
      <p className="text-center text-sm text-muted-foreground">Didn't receive a code?<button type="button" onClick={request} className="ml-2 text-[var(--synapse-accent-500)]">Send again</button></p>
    </div>
  </AuthCard></AuthLayout>;
}
