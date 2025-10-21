import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import AuthPage from "../pages/AuthPage";
import LandingPage from "../pages/LandingPage";
import DashboardPage from "../pages/DashboardPage";

const AppRouter = () => {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/Dashboard" element={<DashboardPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
};

export default AppRouter;
