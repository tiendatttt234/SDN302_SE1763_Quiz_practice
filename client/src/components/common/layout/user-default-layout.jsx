import { Route, Routes, Link } from 'react-router-dom';
import QuizAttempt from '../../user/QuizAttempt';
import QuizResults from '../../user/QuizResult';
import FlashcardPage from '../../user/FlashCard';

export default function UserDefaultPage(){

    return(
        <div className = 'container-fluid' >
            <div className = 'container-fluid' >
                <div className = {`container-fluid `}>
                    <Routes>
                        <Route path='/quiz/attempt/:id' element={<QuizAttempt/>}/>
                        <Route path='/quiz-result' element={<QuizResults/>}/>
                        <Route path='/flash' element={FlashcardPage}/>
                    </Routes>
                </div>
                
            </div>
        </div>
    );
}