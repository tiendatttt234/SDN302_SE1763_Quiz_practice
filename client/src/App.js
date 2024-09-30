// import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom';

import { BrowserRouter, Routes, Route } from "react-router-dom";
// import PrivateRoute from './components/core/PrivateRoute';
import UserDefaultPage from "./components/common/layout/user-default-layout";
import NoAccessPage from "./components/common/pages/NoAccessPage";
import HomePage from "./components/authen/Homepage";
import Login from "./components/authen/Login";
import Register from "./components/authen/Register";
import Header from "./components/common/layout/Header";
import MyCourse from "./components/authen/MyCourse";
import Profile from "./components/authen/Profile";
import ForgotPassword from "./components/authen/ForgotPassword";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          {/* <Route path='/*' element={<AuthRoutes />} />
          <Route path='*' element={<PageNotFound />} />
          <Route path='/manager/*' element={<PrivateRoute element={<DefaultLayoutManager />} allowedRoles={['manager']} />} />
          
          <Route path='/trainer/*' element={<PrivateRoute element={<DefaultLayoutTrainer />} allowedRoles={['trainer']} />} />
          <Route path={`${link.trainee}/*`} element={<PrivateRoute element={<DefaultLayoutTrainee />} allowedRoles={['trainee']} />} />
          */}
          <Route path="/user/*" element={<UserDefaultPage />} />
          {/* <PrivateRoute element={<DefaultLayoutAdmin />} allowedRoles={['admin']} /> */}
          <Route path="/no-access" element={<NoAccessPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mycourse" element={<MyCourse />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
