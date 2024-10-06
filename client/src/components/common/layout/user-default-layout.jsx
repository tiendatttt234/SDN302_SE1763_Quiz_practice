import { Route, Routes, Link } from 'react-router-dom';
import QuizAttempt from '../../user/QuizAttempt';
import QuizResults from '../../user/QuizResult';

export default function UserDefaultPage(){

    return(
        <div className = 'container-fluid' >
            <Link to="/">hehe</Link>
            <div className = 'container-fluid' >
                <div className = {`container-fluid `}>
                    <Routes>
                        <Route path='/quiz/attempt' element={<QuizAttempt/>}/>
                        <Route path='/quiz-result' element={<QuizResults/>}/>
                    </Routes>
                </div>
                
            </div>
        </div>
    );
}