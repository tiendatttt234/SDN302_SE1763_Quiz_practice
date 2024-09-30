import { Routes, Route } from "react-router-dom";
import ManagerDashboard from "../../manager/dashboard/dashboard";
import AddQuestion from "../../manager/question/question";
import ViewQuestionDetail from "../../manager/question/viewQuesDetail";
import ManageQuestion from "../../manager/question/viewQues";
import UpdateQuestion from "../../manager/question/updateQues";
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
      </Routes>
    </div>
  );
}
