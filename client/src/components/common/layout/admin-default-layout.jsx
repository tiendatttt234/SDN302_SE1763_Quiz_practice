import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../../admin/adminComponnents/admin";
import UserManagement from "../../admin/adminComponnents/usermanagement";
import Dashboard from "../../admin/adminComponnents/dashboard";
import AdminProfit from "../../admin/viewProfit";
import ManageBlog from "../../manager/blog/manageBlog";
import ManageEditBlog from "../../manager/blog/editBlog";
import ManageCreateBlog from "../../manager/blog/createBlog";
import PageNotFound from "../../errorPage/PageNotFound";

export default function AdminDefaultPage() {
  return (
    <div>
      <Routes>
          <Route path="/" element={<AdminDashboard/>}/>
          <Route path="/users" element={<UserManagement/>}/>
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/profit" element={<AdminProfit />} />
          <Route path="/manage/blog" element={<ManageBlog/>}/>
          <Route path="/manage/blog/edit/:id" element={<ManageEditBlog/>}/>
          <Route path="/manage/blog/add" element={<ManageCreateBlog/>}/>


          <Route path="/*" element={<PageNotFound/>} />
      </Routes>
    </div>
  );
}
