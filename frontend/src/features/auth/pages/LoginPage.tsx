import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import AuthLayout from "@/features/auth/components/AuthLayout";
import AuthCard from "@/features/auth/components/AuthCard";
import PasswordInput from "@/features/auth/components/PasswordInput";
import SocialLogin from "@/features/auth/components/SocialLogin";
import LoginModeSwitch from "@/features/auth/components/LoginModeSwitch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "@/features/auth/api/auth-api";
import { useAuthStore } from "@/features/auth/store/auth-store";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const setSession = useAuthStore((state) => state.login);

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!identifier || !password) return;

    setLoading(true);
    try {
      const result = await login(identifier, password);

      if (result.requires_verification && result.challenge_id) {
        navigate("/verify-email", {
          state: {
            challengeId: result.challenge_id,
            devCode: result.dev_code,
          },
        });
        return;
      }

      if (!result.user || !result.access_token || !result.refresh_token) {
        throw new Error("Unexpected authentication response");
      }

      setSession(result.user, result.access_token, result.refresh_token, result.session_id);

      const destination =
        (location.state as { from?: string } | null)?.from ||
        "/app/dashboard";

      navigate(destination, { replace: true });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to sign in",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthCard
        title="Welcome back"
        description="Sign in securely to continue using Synapse."
      >
        <form className="space-y-5" onSubmit={submit}>
          <LoginModeSwitch />

          <Input
            value={identifier}
            onChange={(event) => setIdentifier(event.target.value)}
            placeholder="Email address or phone number"
            className="h-12"
            autoComplete="username"
          />

          <PasswordInput
            onChange={setPassword}
            placeholder="Password"
          />

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-muted-foreground">
              <input type="checkbox" className="accent-[var(--synapse-accent-500)]" />
              Remember me
            </label>

            <Link
              to="/forgot-password"
              className="text-[var(--synapse-accent-600)] hover:underline dark:text-[var(--synapse-accent-300)]"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="h-12 w-full"
          >
            {loading ? "Signing in..." : "Login"}
          </Button>

          <SocialLogin />

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?
            <Link
              to="/signup"
              className="ml-2 font-medium text-[var(--synapse-accent-600)] dark:text-[var(--synapse-accent-300)]"
            >
              Create account
            </Link>
          </p>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}
