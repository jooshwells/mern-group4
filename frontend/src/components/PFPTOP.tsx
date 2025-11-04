import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { PencilLine } from "lucide-react";

//
function Pfptop() {
  const [eMail, setEmail] = useState("Email");
  const [firstN, setFirstN] = useState("First Name");

  const [lastN, setLastN] = useState("Last Name");

  const [load, setLoad] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const apiResponse = await fetch("api/auth/user", {
          credentials: "include",
        });
        if (!apiResponse.ok) {
          throw new Error(`Error ${apiResponse.status}`);
        }
        const userInfo = await apiResponse.json();
        if (userInfo.success) {
          setEmail(userInfo.data.user.email);
          setFirstN(userInfo.data.user.first_name);
          setLastN(userInfo.data.user.last_name);
        }
      } catch (error) {
      } finally {
        setLoad(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="w-full justify-center text-center">
      <div className="flex justify-center">
        <Skeleton className="h-[150px] w-[150px] rounded-full mb-5" />
      </div>
      <Button className="absolute rounded-4xl top-50 ml-35">
        <PencilLine />
      </Button>
      <div className="flex justify-center ml-20 mt-0"></div>
      <div className="flex flex-row gap-3 justify-center">
        <p>{firstN}</p>
        <p>{lastN}</p>
      </div>

      <p>{eMail}</p>
    </div>
  );
}

export default Pfptop;
