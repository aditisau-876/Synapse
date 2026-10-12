import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import AuthLayout from "@/features/auth/components/AuthLayout";
import AuthCard from "@/features/auth/components/AuthCard";
import PasswordInput from "@/features/auth/components/PasswordInput";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "@/features/auth/api/auth-api";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { getErrorMessage } from "@/lib/errors";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const setSession = useAuthStore((state) => state.login);

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!identifier.trim() || !password) {
      toast.error("Enter your email or phone, and your password.");
      return;
    }

    setLoading(true);
    try {
      const result = await login(identifier.trim(), password);

      if (result.requires_verification && result.challenge_id) {
        navigate("/verify-email", {
          state: { challengeId: result.challenge_id, devCode: result.dev_code },
        });
        return;
      }

      if (!result.user || !result.access_token || !result.refresh_token) {
        throw new Error("Unexpected response from the server.");
      }

      setSession(result.user, result.access_token, result.refresh_token, result.session_id);

      // ProtectedRoute remembers where you were headed.
      const destination = (location.state as { from?: string } | null)?.from || "/app/dashboard";
      navigate(destination, { replace: true });
    } catch (error) {
      toast.error(getErrorMessage(error, "Unable to sign in."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthCard title="Welcome back" description="Sign in to pick up where you left off.">
        <form className="space-y-4" onSubmit={submit} noValidate>
          <div className="space-y-1.5">
            <label htmlFor="identifier" className="text-sm font-medium">Email or phone</label>
            <Input
              id="identifier"
              value={identifier}
              onChange={(event) => setIdentifier(event.target.value)}
              className="h-11"
              autoComplete="username"
              autoFocus
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <Link to="/forgot-password" className="text-sm font-medium text-brand hover:underline">
                Forgot password?
              </Link>
            </div>
            <PasswordInput id="password" value={password} onChange={setPassword} />
          </div>

          <Button type="submit" disabled={loading} size="lg" className="w-full">
            {loading ? "Signing in…" : "Sign in"}
          </Button>

          <p className="pt-2 text-center text-sm text-muted-foreground">
            New to Synapse?{" "}
            <Link to="/signup" className="font-medium text-brand hover:underline">
              Create an account
            </Link>
          </p>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}
