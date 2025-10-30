import React from "react";
import './App.css';
import { SignupForm } from './components/signup-form';
import Header from './components/ui/header.tsx';
import Theme from "./components/ui/theme-menu.tsx";
import HomeButton from "./components/HomeButton.tsx";



const SignupPage: React.FC = () => {
  
  return (
    <div className="flex flex-col h-full min-h-svh w-full items-center justify-center p-6 md:p-10">
      <Theme/>

      {/* home button  */}
      <div className="absolute right-4 top-4">
          <HomeButton />
      </div>

       <Header />
      {/* signup form */}
      <div className="w-full max-w-md">
        <SignupForm />
        <div className="mt-4 text-center">
          <a href="/login" className="underline hover:text-blue-500">Already have an account? Login</a>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;