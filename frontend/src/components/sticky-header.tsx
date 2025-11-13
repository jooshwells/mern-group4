import { useState, useEffect } from "react";
import Theme from "./ui/theme-menu";
import { GitHubLink } from "./github";
import { Button } from './ui/button'
import { Link } from "react-router-dom"

export default function StickyHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full flex justify-between items-center px-6 py-2 bg-background z-50 transition-shadow duration-300
        ${scrolled 
          ? "shadow-[0_2px_4px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_4px_rgba(255,255,255,0.1)]" 
          : "shadow-none"
        }`}
    >
      <div>
        <Theme />
      </div>
      <div className="flex items-center gap-6">
    <Link to="/login">
      <Button size="lg">Login</Button>
    </Link>
     <GitHubLink />
  </div>
    </div>
  );
}