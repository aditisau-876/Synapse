import {BrowserRouter,Routes,Route} from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/features/auth/pages/LoginPage";
import SignupPage from "@/features/auth/pages/SignupPage";
import VerifyEmailPage from "@/features/auth/pages/VerifyEmailPage";
import AppLayout from "@/components/layout/AppLayout";
import ChatPage from "@/pages/ChatPage";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import ProtectedRoute from "./ProtectedRoute";
import VerifyPhonePage from "@/features/auth/pages/VerifyPhonePage";
import ForgotPasswordPage from "@/features/auth/pages/ForgotPasswordPage";
import ResetPasswordPage from "@/features/auth/pages/ResetPasswordPage";
import CompleteProfilePage from "@/features/onboarding/pages/CompleteProfilePage";
import WelcomePage from "@/features/onboarding/pages/WelcomePage";
import MeetingsPage from "@/features/meetings/pages/MeetingsPage";
import WhiteboardPage from "@/features/whiteboard/pages/WhiteboardPage";
import TasksPage from "@/features/tasks/pages/TasksPage";
import SettingsPage from "@/features/settings/pages/SettingsPage";
import SettingsLayout from "@/features/settings/components/SettingsLayout";
import AIWorkspacePage from "@/features/ai-workspace/pages/AIWorkspacePage";
export default function AppRouter() {

  return (

    <BrowserRouter>

      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/signup" element={<SignupPage />}/>
        <Route path="/verify-email" element={<VerifyEmailPage/>}/>
        <Route path="/verify-phone" element={<VerifyPhonePage/>}/>
        <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
        <Route path="/reset-password" element={<ResetPasswordPage/>}/>
        <Route path="/complete-profile" element={<CompleteProfilePage />}/>
        <Route path="/welcome" element={<WelcomePage />}/>
        {/* Application */}
        <Route path="/app" element={ <AppLayout /> }>
          <Route path="dashboard" element={<DashboardPage/>}/>
          <Route path="chats" element={<ChatPage />}/>
          <Route path="meetings" element={<MeetingsPage />}/>
          <Route path="whiteboard" element={<WhiteboardPage/>}/>
          <Route path="tasks" element={<TasksPage />}/>
          <Route path="ai-workspace" element={<AIWorkspacePage />}/>
           <Route path="settings" element={<SettingsLayout />}>
            <Route index element={<SettingsPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}