import React from "react";
import Theme from "./components/ui/theme-menu.tsx";
import HomeButton from "./components/HomeButton.tsx";

const ProfilePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen items-center justify-start p-6 relative bg-gray-50">
      {/* Theme and Home */}
      <Theme />
      <div className="absolute right-4 top-4">
        <HomeButton />
      </div>
    </div>
  );
};

export default ProfilePage;