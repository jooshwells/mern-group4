import "./App.css";
import { Button } from "./components/ui/button";
import { GitHubLink } from "./components/github";
import { Link } from "react-router-dom";
import Header from "./components/ui/header.tsx";
import Theme from "./components/ui/theme-menu.tsx";

function App() {
  return (
    <div className="flex flex-col h-full min-h-svh w-full items-center justify-center p-6 md:p-10">
      <Theme />

      {/* GitHub link */}
      <div className="absolute right-4 top-4">
        <GitHubLink />
      </div>

      <Header />

      {/* login + signup buttons */}
      <div className="flex gap-4 mb-6">
        <Link to="/login">
          <Button>Login</Button>
        </Link>
        <Link to="/signup">
          <Button>Sign Up</Button>
        </Link>
      </div>
    </div>
  );
}

export default App;
