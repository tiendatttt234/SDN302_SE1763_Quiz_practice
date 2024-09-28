import { Route, Routes, Link } from 'react-router-dom';
import QuizAttempt from '../../user/QuizAttempt';
import QuizResults from '../../user/QuizResult';

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
                    </Routes>
                </div>
                
            </div>
        </div>
    );
}