import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";
import { PencilLine } from "lucide-react";
import homeIcon from "../assets/home.png";

// Automatically import all JPGs in the assets folder
const images = import.meta.glob("../assets/*.jpg", { eager: true, as: "url" });
const profileOptions = Object.values(images);

const Pfptop: React.FC = () => {
  const { theme } = useTheme();

  const [selectedPic, setSelectedPic] = useState(profileOptions[0] || "");
  const [eMail, setEmail] = useState("Email");
  const [firstN, setFirstN] = useState("First Name");
  const [lastN, setLastN] = useState("Last Name");
  const [load, setLoad] = useState(true);
  const [showPicOptions, setShowPicOptions] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const apiResponse = await fetch("api/auth/user", {
          credentials: "include",
        });
        if (!apiResponse.ok) throw new Error(`Error ${apiResponse.status}`);
        const userInfo = await apiResponse.json();
        if (userInfo.success) {
          setEmail(userInfo.data.user.email);
          setFirstN(userInfo.data.user.first_name);
          setLastN(userInfo.data.user.last_name);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoad(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="w-full relative text-center flex flex-col items-center">

      {/* Profile Picture */}
      <div className="flex justify-center relative mt-5">
        {load ? (
          <div className="h-[150px] w-[150px] rounded-full bg-gray-300 animate-pulse mb-5" />
        ) : (
          <img
            src={selectedPic}
            alt="Profile"
            className="h-[150px] w-[150px] rounded-full object-cover border-4 border-amber-600 shadow-lg mb-5"
          />
        )}

        {/* Edit Button */}
        <Button
          className="absolute top-[115px] right-[calc(50%-75px)] rounded-full bg-amber-600 hover:bg-amber-700 text-white p-2"
          onClick={() => setShowPicOptions(!showPicOptions)}
        >
          <PencilLine size={18} />
        </Button>
      </div>

      {/* Name */}
      <div className="flex flex-row gap-3 justify-center font-medium">
        <p>{firstN}</p>
        <p>{lastN}</p>
      </div>

      {/* Email */}
      <p className="text-sm text-gray-500">{eMail}</p>

      {/* Profile Picture Options Grid */}
      {showPicOptions && (
        <div
          className="absolute top-[170px] left-1/2 -translate-x-1/2
                     grid grid-cols-5 gap-2 border-7 p-2 rounded shadow-lg z-50 max-w-[400px]"
          style={{
            backgroundColor:
              theme === "dark"
                ? "oklch(40% 0.05 265deg)"
                : "#ffffff",
            borderColor:
              theme === "dark"
                ? "oklch(28% 0.05 265deg)"
                : "#cccccc",
          }}
        >
          {profileOptions.map((pic, index) => (
            <img
              key={index}
              src={pic}
              alt={`Profile option ${index + 1}`}
              className="h-12 w-12 rounded-full object-cover hover:ring-2 hover:ring-amber-600 cursor-pointer"
              onClick={() => {
                setSelectedPic(pic);
                setShowPicOptions(false);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Pfptop;
