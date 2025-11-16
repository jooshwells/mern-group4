import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "./theme-provider";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";

const HomeButton: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const apiRes = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (apiRes.ok) {
        window.location.href = "/";
      }
    } catch (error) {}
  };

  return (
    <Button onClick={handleLogout} variant="ghost">
      <LogOut className="scale-200" />
    </Button>
  );
};

export default HomeButton;
