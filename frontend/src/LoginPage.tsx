import React from "react";
import './App.css'
import HomeButton from "./components/HomeButton.tsx";
import { LoginForm } from './components/login-form';
import Header from './components/ui/header.tsx';
import Theme from "./components/ui/theme-menu.tsx";

import { useLocation } from "react-router-dom";

import { Alert, AlertDescription } from "@/components/ui/alert"

const LoginPage: React.FC = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const verified = params.get("verified");

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
        
        {verified === "true" && (
          <Alert className="mb-4 bg-card text-card-foreground">
            <AlertDescription className="justify-items-center">
              Your email was verified. Thank you!
            </AlertDescription>
          </Alert>
        )}
        
        {verified === "false" && (
          <Alert className="mb-4 bg-card text-card-foreground">
            <AlertDescription className="justify-items-center">
              Your email was not verified. Please try again!
            </AlertDescription>
          </Alert>
        )}

        <LoginForm />
        <div className="mt-4 text-center">
          <a href="/signup" className="underline hover:text-blue-500">Don't have an account? Sign Up</a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;