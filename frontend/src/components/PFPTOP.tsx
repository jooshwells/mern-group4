import { useEffect, useState } from "react";
import { PencilLine } from "lucide-react";
import { useTheme } from "./theme-provider";

// Automatically import all profile pictures
const images = import.meta.glob("../assets/*.jpg", { eager: true, as: "url" });
const profileOptions = Object.values(images);

function Pfptop() {
  const { theme } = useTheme();

  const [eMail, setEmail] = useState("Email");
  const [firstN, setFirstN] = useState("First Name");
  const [lastN, setLastN] = useState("Last Name");
  const [load, setLoad] = useState(true);
  const [showPicOptions, setShowPicOptions] = useState(false);

  // --- Profile picture selection state ---
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedPic = profileOptions[selectedIndex];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const apiResponse = await fetch("/api/auth/user", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!apiResponse.ok) throw new Error(`Error ${apiResponse.status}`);
        const userInfo = await apiResponse.json();
        if (userInfo.success) {
          setEmail(userInfo.data.user.email);
          setFirstN(userInfo.data.user.first_name);
          setLastN(userInfo.data.user.last_name);
          setSelectedIndex(userInfo.data.user.profile_pic || 0);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoad(false);
      }
    };
    fetchUser();
  }, []);

  const handlePictureSelect = async (index: number) => {
    setSelectedIndex(index);
    setShowPicOptions(false);

    try {
      await fetch("/api/profile/update-info", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ profile_pic: index }),
      });
    } catch (error) {
      console.error("Error saving profile picture");
    }
  };

  return (
    <div className="flex flex-col w-full md:flex-row gap-10 items-start mt-10">
      {/* Left Column: Profile Picture */}
      <div className="flex flex-col items-center w-full md:w-1/2">
        <div className="relative w-[300px] h-[300px] md:ml-100 -mt-14">
          {load ? (
            <div className="h-full w-full rounded-full bg-gray-300 animate-pulse" />
          ) : (
            <img
              src={selectedPic}
              alt="Profile"
              className={`h-full w-full rounded-full object-cover border-7 ${
                theme === "dark" ? "border-primary" : "border-foreground"
              }`}
            />
          )}

          {/* Pencil/Edit Button */}
          <div
            className={`absolute bottom-1 right-1 rounded-full flex items-center justify-center cursor-pointer
              ${
                theme === "dark"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-foreground hover:bg-secondary-500"
              }`}
            style={{ width: "76px", height: "76px" }}
            onClick={() => setShowPicOptions(!showPicOptions)}
          >
            <PencilLine width={25} height={25} className="text-white" />
          </div>

          {/* Profile Selection Grid Overlay */}
          {showPicOptions && (
            <div
              className="absolute top-full left-0 mt-2 grid grid-cols-5 gap-2 border-[10px] p-4 rounded shadow-lg z-50"
              style={{
                backgroundColor:
                  theme === "dark" ? "oklch(40% 0.05 265deg)" : "#ffffff",
                borderColor:
                  theme === "dark" ? "oklch(28% 0.05 265deg)" : "#cccccc",
              }}
            >
              {profileOptions.map((pic, index) => (
                <img
                  key={index}
                  src={pic}
                  alt={`Profile option ${index + 1}`}
                  className={`h-12 w-12 rounded-full object-cover cursor-pointer hover:ring-2 ${
                    theme === "dark"
                      ? "hover:ring-amber-600"
                      : "hover:ring-teal-600"
                  }`}
                  onClick={() => {
                    handlePictureSelect(index);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Text Info */}
      <div className="flex flex-col w-full md:w-1/2 md:flex-nowrap justify-start items-start gap-4 ml-5 relative">
        {/* Vertical Divider */}
        <div className="absolute left-0 -top-4 h-[180px] border-l-6 border-gray-400 dark:border-gray-500"></div>

        <div className="flex flex-col font-bold text-3xl gap-2.5 pl-5">
          <p className="text-foreground dark:text-gray-200">{firstN}</p>
          <p className="text-foreground dark:text-gray-200">{lastN}</p>
        </div>
        <p className="text-2xl text-forground dark:text-gray-200 pl-5">
          {eMail}
        </p>
      </div>
    </div>
  );
}

export default Pfptop;
