import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import PrivateRoute from "./components/core/PrivateRoute";
import HomePage from "./components/authen/Homepage";
import NoAccessPage from "./components/common/pages/NoAccessPage";
import AdminDefaultPage from "./components/common/layout/admin-default-layout";
import Header from "./components/common/layout/Header/Header";
import Login from "./components/authen/Login/Login";
import Register from "./components/authen/Register/Register";
import Footer from "./components/common/layout/Footer/Footer";
import UserDefaultPage from "./components/common/layout/user-default-layout";
import FlashcardPage from "./components/user/FlashCard";
import ImportFilePage from "./components/admin/adminComponnents/importQuestion";
import BlogList from "./components/user/BlogList";
import BlogDetail from "./components/user/BlogDetail";
import ForgotPassword from "./components/authen/ForgotPassword/ForgotPassword";
import ResetPass from "./components/authen/ForgotPassword/ResetPassword";
import Profile from "./components/authen/Profile";

function App() {
  const location = useLocation();

  const hideHeaderRoutes = ["/admin/users", "/admin/dashboard"];

  return (
    <div className="App">
      <Header />
      <Routes>
        {/* Common Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/reset-password/:id/:token" element={<ResetPass />} />
        {/* Đã xóa /* */}
        <Route path="/no-access" element={<NoAccessPage />} />
        <Route path="/flash/:id" element={<FlashcardPage />} />
        <Route path="/blogList" element={<BlogList />} />
        <Route path="/blog/detail/:blogId" element={<BlogDetail />} />
        {/* User Routes */}
        <Route
          path="/user/*"
          element={
            <PrivateRoute element={<UserDefaultPage />} requiredRole="user" />
          }
        />
        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <PrivateRoute element={<AdminDefaultPage />} requiredRole="admin" />
          }
        />
        <Route path="/addQuestion" element={<ImportFilePage />} />
        <Route path="/*" element={<NoAccessPage />} />{" "}
        {/* Route chung này nên ở cuối */}
      </Routes>
      <Footer />
    </div>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

// Gọi ReactDOM.render bên ngoài
ReactDOM.render(<AppWrapper />, document.getElementById("root"));
