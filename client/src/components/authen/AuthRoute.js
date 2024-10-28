import { Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import Register from './Register/Register';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import HomePage from './Homepage';

function AuthRoutes(){
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/resetpassword" element={<ForgotPassword />} />
        </Routes>
    )
}

export default AuthRoutes;