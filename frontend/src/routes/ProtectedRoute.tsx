import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store/auth-store";

interface Props {
  children: React.ReactNode;
}

/** Sends signed-out visitors to /login and remembers where they were going. */
export default function ProtectedRoute({ children }: Props) {
  const location = useLocation();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const accessToken = useAuthStore((state) => state.accessToken);

  if (!isAuthenticated || !accessToken) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }

  return children;
}

/** For /login and /signup: signed-in users go straight to the app. */
export function GuestRoute({ children }: Props) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const accessToken = useAuthStore((state) => state.accessToken);

  if (isAuthenticated && accessToken) {
    return <Navigate to="/app/dashboard" replace />;
  }
  return children;
}
