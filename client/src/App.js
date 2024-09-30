import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/common/layout/Header";
import HomePage from "./components/authen/Homepage";
import Footer from "./components/common/layout/Footer";
import Login from "./components/authen/Login";
import Register from "./components/authen/Register";
import ForgotPassword from "./components/authen/ForgotPassword";
import Profile from "./components/authen/Profile";
import MyCourse from "./components/authen/MyCourse";
import UserDefaultPage from './components/common/layout/user-default-layout';
import NoAccessPage from './components/common/pages/NoAccessPage';
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
          <Route path='/' element={<div>h3h3</div>}/>
          <Route path='/user/*' element={<UserDefaultPage/>} />
          {/* <PrivateRoute element={<DefaultLayoutAdmin />} allowedRoles={['admin']} /> */}
          <Route path="/no-access" element={<NoAccessPage />} />
            <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/resetpassword" element={<ForgotPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/mycourse" element={<MyCourse />} />
        =
        <Footer />

      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
