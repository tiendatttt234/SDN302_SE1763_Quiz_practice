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

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/resetpassword" element={<ForgotPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/mycourse" element={<MyCourse />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
