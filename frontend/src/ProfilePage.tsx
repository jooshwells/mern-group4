import React, { useState } from "react";
import Theme from "./components/ui/theme-menu.tsx";
import HomeButton from "./components/HomeButton.tsx";
import Pfptop from "./components/PFPTOP.tsx";
import EditAccount from "./components/EditAccount.tsx";
import RecentWork from "./components/RecentWork.tsx";

const ProfilePage: React.FC = () => {
  const [hide, setVisible] = useState(false);

  const editAcc = () => {
    setVisible((prev) => !prev);
  };

  return (
    <div
    className="flex flex-col min-h-screen items-center justify-start p-6 relative
             border-[25px] border-gray-203 dark:border-gray-800">

      {/* Theme and Home */}
      <Theme />
      <div className="absolute right-4 top-4">
        <HomeButton />
      </div>

      {/* Profile Picture Section */}
      <div className="mt-10 w-full justify-center">
        <Pfptop />
      </div>

      {/* Separator */}
      <div className="mt-5 border-t-8 w-full rounded border-rose-400 dark:border-amber-600"></div>

      {/* Edit Account Section */}
      <div className="mt-10">
        <EditAccount className={`hide ? "block" : "hidden"`} />
      </div>

    </div>
  );
};

export default ProfilePage;