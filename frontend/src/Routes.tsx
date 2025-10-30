import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App";           // homepage
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import ProfilePage from "./ProfilePage";

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignupPage />} />
    <Route path="/profile" element={<ProfilePage />} />

  </Routes>
);

export default AppRoutes;