import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
import ManagerDashboard from './components/manager/dashboard/dashboard';
import AddQuestion from './components/manager/question/question';
import ViewQuestionDetail from './components/manager/question/viewQuesDetail';
import ManageQuestion from './components/manager/question/viewQues';



function App() {
  return (
    <Router>
      <div className="App">
       
        <Routes>
        <Route path="/managerdb" element={<ManagerDashboard />} />
          <Route path="/managerdb/question" element={<AddQuestion />} />
          <Route path="/managerdb/viewques" element={<ViewQuestionDetail />} />
          <Route path="/managerdb/viewques/:id" element={<ViewQuestionDetail />} />
          <Route path="/managerdb/manaques" element={<ManageQuestion />} />
          
         
        </Routes>
      </div>
    </Router>
  );
}

export default App;
