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
import React from "react";
import Theme from "./components/ui/theme-menu.tsx";
import HomeButton from "./components/HomeButton.tsx";
import Pfptop from "./components/PFPTOP.tsx";
import EditAccount from "./components/EditAccount.tsx";
import RecentWork from "./components/RecentWork.tsx";
import { useState } from "react";

const ProfilePage: React.FC = () => {
  const [hide, setVisible] = useState(false);

  const editAcc = () => {
    setVisible((prev) => !prev);
  };
  return (
    <div className="flex flex-col min-h-screen items-center justify-start p-6 relative">
      {/* Theme and Home */}
      <Theme />
      <div className="absolute right-4 top-4">
        <HomeButton />
      </div>
      <div className="mt-10 w-full justify-center">
        <Pfptop></Pfptop>
      </div>
      <div className="mt-5 border border-t-amber-600 w-screen"></div>

      <div className="mt-10 ">
        <EditAccount className={`hide ? "block" : "hidden"`}></EditAccount>
      </div>
      <div className="mt-5 border border-t-amber-600 w-screen"></div>

      <div className="mt-10 ">
        <RecentWork />
      </div>
    </div>
  );
};

export default ProfilePage;
