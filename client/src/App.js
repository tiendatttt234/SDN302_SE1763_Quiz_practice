
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import PrivateRoute from './components/core/PrivateRoute';
import Header from "./components/common/layout/Header/Header";
import Footer from "./components/common/layout/Footer/Footer";
import UserDefaultPage from './components/common/layout/user-default-layout';
import NoAccessPage from './components/common/pages/NoAccessPage';
import ManagerDefaultPage from "./components/common/layout/manager-default-layout";
import AdminProfit from "./components/admin/viewProfit";
import ForgotPassword from "./components/authen/ForgotPassword/ForgotPassword";
import AdminDashboard from '../src/components/admin/adminComponnents/admin'
import UserManagement from './components/admin/adminComponnents/usermanagement';
import Dashboard from './components/admin/adminComponnents/dashboard';
import UpgradePage from "./components/common/pages/UpgradePage";
import CheckoutForm from "./components/common/pages/CheckOutPage";
import BlogList from "./components/user/BlogList";
import BlogDetail from "./components/user/BlogDetail";
import AuthRoutes from "./components/authen/AuthRoute";
import AdminDefaultPage from "./components/common/layout/admin-default-layout";


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Header/>
      <Routes>
          {/* <Route path='/*' element={<AuthRoutes />} />
          <Route path='*' element={<PageNotFound />} />
          <Route path='/manager/*' element={<PrivateRoute element={<DefaultLayoutManager />} allowedRoles={['manager']} />} />
          
          <Route path='/trainer/*' element={<PrivateRoute element={<DefaultLayoutTrainer />} allowedRoles={['trainer']} />} />
          <Route path={`${link.trainee}/*`} element={<PrivateRoute element={<DefaultLayoutTrainee />} allowedRoles={['trainee']} />} />
          */}
          <Route path="/*" element={<AuthRoutes />} />
          <Route path="/user/*" element={<UserDefaultPage />} />
          <Route path="/managerdb/*" element={<ManagerDefaultPage/>}/> {/* bỏ role manager   */}
          <Route path="admin/*" element={<AdminDefaultPage/>}/>
          



          <Route path="/no-access" element={<NoAccessPage />} />
          <Route path="/upgrade" element={<UpgradePage/>}/>
          <Route path="/checkout" element={<CheckoutForm />} />
          <Route path="/blogList" element={<BlogList/>}/>
          <Route path="/blogDetail" element={<BlogDetail/>}/>

      
      </Routes>
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
