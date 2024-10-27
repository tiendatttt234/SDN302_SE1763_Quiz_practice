import { Route, Routes } from "react-router-dom";
import QuizAttempt from "../../user/QuizAttempt";
import QuizResults from "../../user/QuizResult";
import AddQuestion from "../../user/question/AddQues";
import ViewQuestionDetail from "../../user/question/ViewQuesDetail";
import EditQuestion from "../../user/question/UpdateQuestion";
import ViewQuestion from "../../user/question/ViewQues";
import FlashCardPage from "../../user/FlashCard";
import Profile from "../../authen/Profile";
import MyCourse from "../../authen/MyCourse";

export default function UserDefaultPage() {
  return (
    <div className="container-fluid">
      {/* <Header/> */}
      <div className="container-fluid">
        <div className={`container-fluid `}>
          <Routes>
            {/* Làm quiz */}
            <Route path="/quiz/attempt/:id" element={<QuizAttempt />} />
            <Route path="/quiz-result" element={<QuizResults />} />

            {/* Chỉnh sửa tệp câu hỏi  */}
            <Route path='/flash' element={FlashCardPage}/>
            <Route path="/addquestion" element={<AddQuestion />} />
            <Route path="/viewques" element={<ViewQuestion />} />
            <Route path="/viewques/:id" element={<ViewQuestionDetail />} />
            <Route path="/updatequestion/:id" element={<EditQuestion />} />
            

            {/* user profile */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/mycourse" element={<MyCourse />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
