import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "./theme-provider";

const HomeButton: React.FC<{ className?: string }> = ({ className }) => {
  const { theme } = useTheme();

  return (
    <Link to="/">
      <img
        src="/home.png" 
        alt="Home"
        className={`className="h-14 w-14 cursor-pointer transition hover:opacity-80"${className || ""}`}
        style={{
          filter:
            theme === "dark"
              ? "invert(1) brightness(1.2)" 
              : "invert(0) brightness(1)",   
        }}
      />
    </Link>
  );
};

export default HomeButton;