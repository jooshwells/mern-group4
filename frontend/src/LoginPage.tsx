import React from "react";
import './App.css'
import HomeButton from "./components/HomeButton.tsx";
import { LoginForm } from './components/login-form';
import Header from './components/ui/header.tsx';
import Theme from "./components/ui/theme-menu.tsx";

const LoginPage: React.FC = () => {

  return (
    <div className="flex flex-col h-full min-h-svh w-full items-center justify-center p-6 md:p-10">

      <Theme/>
       {/* home button  */}
      <div className="absolute right-4 top-4">
          <HomeButton />
      </div>

       <Header />

      {/* login form */}
      <div className="w-full max-w-md">
        <LoginForm />
        <div className="mt-4 text-center">
          <a href="/signup" className="underline hover:text-blue-500">Don't have an account? Sign Up</a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;