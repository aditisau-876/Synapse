import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errors";

import AuthLayout from "@/features/auth/components/AuthLayout";
import AuthCard from "@/features/auth/components/AuthCard";
import PasswordInput from "@/features/auth/components/PasswordInput";
import PasswordStrength from "@/features/auth/components/PasswordStrength";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signup } from "@/features/auth/api/auth-api";

export default function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const update = (key: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [key]: value }));

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const result = await signup({
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        password: form.password,
      });

      navigate("/verify-email", {
        state: {
          challengeId: result.verification?.challenge_id ?? result.challenge_id,
          devCode: result.verification?.dev_code ?? result.dev_code,
        },
      });
    } catch (error) {
      toast.error(
        getErrorMessage(error, "Unable to create account"),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthCard
        title="Create your account"
        description="Create a secure Synapse account."
      >
        <form className="space-y-5" onSubmit={submit}>
          <Input
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Full name"
            className="h-11"
            autoComplete="name"
            required
          />

          <Input
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="Email address"
            type="email"
            className="h-11"
            autoComplete="email"
            required
          />

          <Input
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="Phone number (optional)"
            type="tel"
            className="h-11"
            autoComplete="tel"
          />

          <PasswordInput
            placeholder="Create password"
            onChange={(value) => update("password", value)}
          />

          <div>
            <Input
              value={form.confirmPassword}
              onChange={(e) => update("confirmPassword", e.target.value)}
              placeholder="Confirm password"
              type="password"
              className="h-11"
              autoComplete="new-password"
              required
            />

            <PasswordStrength password={form.password} />
          </div>

          <label className="flex items-start gap-3 text-sm text-muted-foreground">
            <input
              type="checkbox"
              required
              className="mt-1 accent-[var(--synapse-accent-500)]"
            />
            <span>
              I agree to Synapse's
              <span className="mx-1 font-medium text-brand dark:text-[color:var(--synapse-accent-300)]">
                Terms
              </span>
              and
              <span className="ml-1 font-medium text-brand dark:text-[color:var(--synapse-accent-300)]">
                Privacy Policy
              </span>
            </span>
          </label>

          <Button type="submit" disabled={loading} size="lg" className="w-full">
            {loading ? "Creating account..." : "Create Account"}
          </Button>


          <p className="text-center text-sm text-muted-foreground">
            Already have an account?
            <Link
              to="/login"
              className="ml-2 font-medium text-brand dark:text-[color:var(--synapse-accent-300)]"
            >
              Login
            </Link>
          </p>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}
