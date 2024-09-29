// import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
import ManagerDashboard from './components/manager/dashboard/dashboard';
import AddQuestion from './components/manager/question/question';
import ViewQuestionDetail from './components/manager/question/viewQuesDetail';
import ManageQuestion from './components/manager/question/viewQues';



import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import PrivateRoute from './components/core/PrivateRoute';
import UserDefaultPage from './components/common/layout/user-default-layout';
import NoAccessPage from './components/common/pages/NoAccessPage';
import HomePage from './components/authen/Homepage';
import Login from './components/authen/Login/Login';
import Register from './components/authen/Register/Register';

function App() {
  return (

    <BrowserRouter>
    <div className="App">
      <Routes>
          {/* <Route path='/*' element={<AuthRoutes />} />
          <Route path='*' element={<PageNotFound />} />
          <Route path='/manager/*' element={<PrivateRoute element={<DefaultLayoutManager />} allowedRoles={['manager']} />} />
          
          <Route path='/trainer/*' element={<PrivateRoute element={<DefaultLayoutTrainer />} allowedRoles={['trainer']} />} />
          <Route path={`${link.trainee}/*`} element={<PrivateRoute element={<DefaultLayoutTrainee />} allowedRoles={['trainee']} />} />
          */}
          <Route path='/user/*' element={<UserDefaultPage/>} />
          {/* <PrivateRoute element={<DefaultLayoutAdmin />} allowedRoles={['admin']} /> */}
          <Route path="/no-access" element={<NoAccessPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/managerdb" element={<ManagerDashboard />} />
          <Route path="/managerdb/question" element={<AddQuestion />} />
          <Route path="/managerdb/viewques" element={<ViewQuestionDetail />} />
          <Route path="/managerdb/viewques/:id" element={<ViewQuestionDetail />} />
          <Route path="/managerdb/manaques" element={<ManageQuestion />} />
          
      </Routes>
    </div>
    </BrowserRouter>

  );
}

export default App;
