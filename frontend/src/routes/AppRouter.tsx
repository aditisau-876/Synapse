import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import NotFoundPage from "@/pages/NotFoundPage";
import LoginPage from "@/features/auth/pages/LoginPage";
import SignupPage from "@/features/auth/pages/SignupPage";
import VerifyEmailPage from "@/features/auth/pages/VerifyEmailPage";
import VerifyPhonePage from "@/features/auth/pages/VerifyPhonePage";
import ForgotPasswordPage from "@/features/auth/pages/ForgotPasswordPage";
import ResetPasswordPage from "@/features/auth/pages/ResetPasswordPage";
import AppLayout from "@/components/layout/AppLayout";
import ChatPage from "@/pages/ChatPage";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import ProtectedRoute, { GuestRoute } from "./ProtectedRoute";
import CompleteProfilePage from "@/features/onboarding/pages/CompleteProfilePage";
import WelcomePage from "@/features/onboarding/pages/WelcomePage";
import MeetingsPage from "@/features/meetings/pages/MeetingsPage";
import MeetingRoomPage from "@/features/meetings/pages/MeetingRoomPage";
import WhiteboardPage from "@/features/whiteboard/pages/WhiteboardPage";
import TasksPage from "@/features/tasks/pages/TasksPage";
import SettingsPage from "@/features/settings/pages/SettingsPage";
import AIWorkspacePage from "@/features/ai-workspace/pages/AIWorkspacePage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
        <Route path="/signup" element={<GuestRoute><SignupPage /></GuestRoute>} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/verify-phone" element={<VerifyPhonePage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        <Route path="/complete-profile" element={<ProtectedRoute><CompleteProfilePage /></ProtectedRoute>} />
        <Route path="/welcome" element={<ProtectedRoute><WelcomePage /></ProtectedRoute>} />

        {/* The meeting room is full-screen: it lives outside the app shell. */}
        <Route
          path="/app/meetings/:code"
          element={<ProtectedRoute><MeetingRoomPage /></ProtectedRoute>}
        />

        <Route
          path="/app"
          element={<ProtectedRoute><AppLayout /></ProtectedRoute>}
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="chats" element={<ChatPage />} />
          <Route path="meetings" element={<MeetingsPage />} />
          <Route path="whiteboard" element={<WhiteboardPage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="ai-workspace" element={<AIWorkspacePage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="settings/:section" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
