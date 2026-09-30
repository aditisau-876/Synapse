import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import AuthLayout from "@/features/auth/components/AuthLayout";
import AuthCard from "@/features/auth/components/AuthCard";
import OTPInput from "@/features/auth/components/OTPInput";
import { Button } from "@/components/ui/button";
import { verifyEmail } from "@/features/auth/api/auth-api";
import { useAuthStore } from "@/features/auth/store/auth-store";

export default function VerifyEmailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const setSession = useAuthStore((state) => state.login);

  const state = location.state as
    | { challengeId?: string; devCode?: string }
    | null;

  const [code, setCode] = useState(state?.devCode ?? "");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!state?.challengeId || code.length !== 6) {
      toast.error("Enter the 6-digit verification code");
      return;
    }

    setLoading(true);
    try {
      const result = await verifyEmail(state.challengeId, code);

      if (
        !result.user ||
        !result.access_token ||
        !result.refresh_token
      ) {
        throw new Error("Verification completed but no session was returned");
      }

      setSession(
        result.user,
        result.access_token,
        result.refresh_token,
        result.session_id,
      );

      navigate("/app/dashboard", { replace: true });
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to verify email",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthCard
        title="Verify your email"
        description="Enter the 6-digit code sent to your email address."
      >
        <div className="space-y-6">
          <OTPInput value={code} onChange={setCode} />

          {state?.devCode && (
            <p className="rounded-xl bg-amber-500/10 px-3 py-2 text-xs text-amber-700 dark:text-amber-300">
              Development mode: the verification code has been prefilled.
            </p>
          )}

          <Button
            type="button"
            disabled={loading}
            onClick={submit}
            className="h-12 w-full"
          >
            {loading ? "Verifying..." : "Verify Email"}
          </Button>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}
