import { Routes, Route } from "react-router-dom";
import ManagerDashboard from "../../manager/dashboard/dashboard";
import AddQuestion from "../../manager/question/question";
import ViewQuestionDetail from "../../manager/question/viewQuesDetail";
import ManageQuestion from "../../manager/question/viewQues";
import UpdateQuestion from "../../manager/question/updateQues";
import ManageBlog from "../../manager/blog/manageBlog";
import ManageCreateBlog from "../../manager/blog/createBlog";
import ManageEditBlog from "../../manager/blog/editBlog";
export default function ManagerDefaultPage() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ManagerDashboard />} />
        <Route path="/question" element={<AddQuestion />} />
        <Route path="/viewques" element={<ViewQuestionDetail />} />
        <Route path="/viewques/:id" element={<ViewQuestionDetail />}/>
        <Route path="/manaques" element={<ManageQuestion />} />
        <Route path='/updatequestion/:id' element={<UpdateQuestion/>} />
        <Route path="/manageBlog" element={<ManageBlog />} />
        <Route path="/manageBlog/add-blog" element={<ManageCreateBlog />} />
        <Route
            path="/manageBlog/edit-blog/:id"
            element={<ManageEditBlog />}
          />
      </Routes>
    </div>
  );
}
