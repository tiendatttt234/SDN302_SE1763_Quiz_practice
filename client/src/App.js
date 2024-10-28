import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/core/PrivateRoute";
import HomePage from "./components/authen/Homepage";
import MyCourse from "./components/authen/MyCourse";
import NoAccessPage from "./components/common/pages/NoAccessPage";
import ManagerDefaultPage from "./components/common/layout/manager-default-layout";
import AdminProfit from "./components/admin/viewProfit";
import AdminDashboard from "../src/components/admin/adminComponnents/admin";
import UserManagement from "./components/admin/adminComponnents/usermanagement";
import Header from "./components/common/layout/Header/Header";
import Login from "./components/authen/Login/Login";
import Register from "./components/authen/Register/Register";
import Footer from "./components/common/layout/Footer/Footer";
import AdminManageBlog from "./components/admin/adminComponnents/blogManagement";
import BlogList from "./components/user/BlogList";
import BlogDetail from "./components/user/BlogDetail";
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
            path="/admin/blog"
            element={
              <PrivateRoute
                element={<AdminManageBlog />}
                requiredRole="admin"
              />
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

          <Route path="/blogList" element={<BlogList />} />
          <Route path="/blog/detail/:blogId" element={<BlogDetail />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
