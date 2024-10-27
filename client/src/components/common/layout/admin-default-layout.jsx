import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../../admin/adminComponnents/admin";
import UserManagement from "../../admin/adminComponnents/usermanagement";
import Dashboard from "../../admin/adminComponnents/dashboard";
import AdminProfit from "../../admin/viewProfit";

export default function AdminDefaultPage() {
  return (
    <div>
      <Routes>
        <Route path="/admin" element={<AdminDashboard/>}/>
          <Route path="/admin/users" element={<UserManagement/>}/>
          <Route path="/admin/dashboard" element={<Dashboard/>} />
          <Route path="/admin/profit" element={<AdminProfit />} />
      </Routes>
    </div>
  );
}
