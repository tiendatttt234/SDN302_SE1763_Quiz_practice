import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../../admin/adminComponnents/admin";
import UserManagement from "../../admin/adminComponnents/usermanagement";
import Dashboard from "../../admin/adminComponnents/dashboard";
import AdminProfit from "../../admin/viewProfit";
import PageNotFound from "../../errorPage/PageNotFound";
import AdminManageBlog from "../../admin/adminComponnents/blogManagement";

export default function AdminDefaultPage() {
  return (
    <div>
      <Routes>
          <Route path="/" element={<AdminDashboard/>}/>
          <Route path="/users" element={<UserManagement/>}/>
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/profit" element={<AdminProfit />} />
          <Route path="/manage/blog" element={<AdminManageBlog/>}/>


          <Route path="/*" element={<PageNotFound/>} />
      </Routes>
    </div>
  );
}
