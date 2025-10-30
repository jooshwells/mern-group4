<<<<<<< HEAD
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import AppRoutes from './Routes'
import { ThemeProvider } from './components/theme-provider.tsx'
=======
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { NoteEditor } from "./pages/NoteEditor.tsx";
>>>>>>> 86e585f (Create note editor and timer)

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
<<<<<<< HEAD
    <BrowserRouter>
      <AppRoutes/>
    </BrowserRouter>
=======
      <BrowserRouter>
        <Routes>
          <Route index element={<App />} />
          <Route path="edit" element={<NoteEditor />} />
        </Routes>
      </BrowserRouter>
>>>>>>> 86e585f (Create note editor and timer)
    </ThemeProvider>
  </StrictMode>
);
