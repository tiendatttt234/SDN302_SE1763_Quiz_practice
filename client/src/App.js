import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/core/PrivateRoute";
import HomePage from "./components/authen/Homepage";
import Login from "./components/authen/Login";
import Register from "./components/authen/Register";
import Header from "./components/common/layout/Header";
import MyCourse from "./components/authen/MyCourse";
import NoAccessPage from "./components/common/pages/NoAccessPage";
import ManagerDefaultPage from "./components/common/layout/manager-default-layout";
import AdminProfit from "./components/admin/viewProfit";
import AdminDashboard from "../src/components/admin/adminComponnents/admin";
import UserManagement from "./components/admin/adminComponnents/usermanagement";
import Footer from "./components/common/layout/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mycourse" element={<MyCourse />} />
          <Route path="/no-access" element={<NoAccessPage />} />

          {/* Admin Routes */}
          <Route
            path="/admin/*"
            element={
              <PrivateRoute element={<AdminDashboard />} requiredRole="admin" />
            }
          />
          <Route
            path="/admin/profit"
            element={
              <PrivateRoute element={<AdminProfit />} requiredRole="admin" />
            }
          />
          <Route
            path="/admin/users"
            element={
              <PrivateRoute element={<UserManagement />} requiredRole="admin" />
            }
          />

          {/* Manager Routes */}
          <Route
            path="/managerdb/*"
            element={
              <PrivateRoute
                element={<ManagerDefaultPage />}
                requiredRole="manager"
              />
            }
          />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;