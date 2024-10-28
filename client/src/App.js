import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/core/PrivateRoute";
import HomePage from "./components/authen/Homepage";
import NoAccessPage from "./components/common/pages/NoAccessPage";
import AdminDefaultPage from "./components/common/layout/admin-default-layout";
import Header from "./components/common/layout/Header/Header";
import Login from "./components/authen/Login/Login";
import Register from "./components/authen/Register/Register";
import Footer from "./components/common/layout/Footer/Footer";
import UserDefaultPage from "./components/common/layout/user-default-layout";
import FlashcardPage from "./components/user/FlashCard";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          {/* Common Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/no-access" element={<NoAccessPage />} />
          <Route path='/flash' element={FlashcardPage}/>



          {/* User Routes  */}
          <Route
            path="/admin/*"
            element={
              <PrivateRoute element={<UserDefaultPage />} requiredRole="user" />
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/*"
            element={
              <PrivateRoute element={<AdminDefaultPage />} requiredRole="admin" />
            }
          />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;