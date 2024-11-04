import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import HomePage from "./components/authen/Homepage";
import Login from "./components/authen/Login";
import Register from "./components/authen/Register";
import Header from "./components/common/layout/Header";
import MyCourse from "./components/authen/MyCourse";
import UserDefaultPage from './components/common/layout/user-default-layout';
import NoAccessPage from './components/common/pages/NoAccessPage';
import Flashcard from './components/user/FlashCard';
import ManagerDefaultPage from "./components/common/layout/manager-default-layout";
import AdminProfit from "./components/admin/viewProfit";
import Profile from "./components/authen/Profile";
import ForgotPassword from "./components/authen/ForgotPassword";
import Footer from "./components/common/layout/Footer";
import AdminDashboard from '../src/components/admin/adminComponnents/admin';
import UserManagement from './components/admin/adminComponnents/usermanagement';
import Dashboard from './components/admin/adminComponnents/dashboard';
import UpgradePage from "./components/common/pages/UpgradePage";
import CheckoutForm from "./components/common/pages/CheckOutPage";
import BlogList from "./components/user/BlogList";
import BlogDetail from "./components/user/BlogDetail";
import ImportFilePage from "./components/admin/adminComponnents/importQuestion";

function App() {
  const location = useLocation();

  
  const hideHeaderRoutes = ["/admin/users", "/admin/dashboard"];

  return (
    <div className="App">
    
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}

      <Routes>
        <Route path="/user/*" element={<UserDefaultPage />} />
        <Route path="/managerdb/*" element={<ManagerDefaultPage />} />
        <Route path="/admin/profit" element={<AdminProfit />} />
        <Route path="/no-access" element={<NoAccessPage />} />
        <Route path="/resetpassword" element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/mycourse" element={<MyCourse />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/upgrade" element={<UpgradePage />} />
        <Route path="/checkout" element={<CheckoutForm />} />
        <Route path="/flash" element={<Flashcard />} />
        <Route path="/blogList" element={<BlogList />} />
        <Route path="/blogDetail" element={<BlogDetail />} />
        <Route path="/user/addQuestion" element={<ImportFilePage />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
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
