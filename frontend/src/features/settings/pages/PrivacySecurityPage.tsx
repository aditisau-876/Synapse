import PrivacySection from "../components/PrivacySection";
import SecuritySection from "../components/SecuritySection";

export default function PrivacySecurityPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">
          Privacy & Security
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Control who can see your information and manage
          your account security.
        </p>
      </div>

      {/* Privacy */}
      <PrivacySection />

      {/* Security */}
      <SecuritySection />
    </div>
  );
}