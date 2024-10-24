import { Route, Routes, Link } from 'react-router-dom';
import QuizAttempt from '../../user/QuizAttempt';
import QuizResults from '../../user/QuizResult';
import AddQuestion from '../../user/question/AddQues';
import ViewQuestionDetail from '../../user/question/ViewQuesDetail';
import EditQuestion from '../../user/question/UpdateQuestion';
import ViewQuestion from '../../user/question/ViewQues';



export default function UserDefaultPage(){

    return(
        <div className = 'container-fluid' >
            {/* <Header/> */}
            <div className = 'container-fluid' >
                <div className = {`container-fluid `}>
                    <Link to='/user/quiz/attempt'>Click here</Link>
                    <Routes>
                        <Route path='/quiz/attempt' element={<QuizAttempt/>}/>
                        <Route path='/quiz-result' element={<QuizResults/>}/>
                        <Route path='/addquestion' element={<AddQuestion/>}/>
                        <Route path='/viewques' element={<ViewQuestion/>}/>
                        <Route path="/viewques/:id" element={<ViewQuestionDetail />} />
                        <Route path='/updatequestion/:id' element={<EditQuestion/>}/>
                    </Routes>
                </div>
                
            </div>
        </div>
    );
}