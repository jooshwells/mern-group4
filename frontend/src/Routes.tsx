import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App";           // homepage
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import ProfilePage from "./ProfilePage";
import { NoteEditorPage } from "./pages/NoteEditorPage";

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignupPage />} />
    <Route path="/profile" element={<ProfilePage />} />
    <Route path="/edit" element={<NoteEditorPage />} />

  </Routes>
);

export default AppRoutes;