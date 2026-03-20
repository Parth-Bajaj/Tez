import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import NewsPage from "./pages/NewsPage";
import VerifyPage from "./pages/VerifyPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import SavedNews from "./pages/SavedNews";
import AdminDashboard from "./pages/AdminDashboard";
import ReportPage from "./pages/ReportPage";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "explore", element: <Explore /> },
      { path: "news/:newsId", element: <NewsPage /> },
      { path: "verify", element: <VerifyPage /> },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "saved",
        element: (
          <ProtectedRoute>
            <SavedNews />
          </ProtectedRoute>
        ),
      },
      { path: "report", element: <ReportPage /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute adminOnly>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [{ index: true, element: <AdminDashboard /> }],
  },
  { path: "*", element: <NotFound /> },
]);

export default router;

