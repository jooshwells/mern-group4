import { Button } from "./ui/button";
import { useState } from "react";
import { FileCheck } from "lucide-react";

interface EditAccountProps {
  className?: string;
}

function EditAccount({ className }: EditAccountProps) {
  const [hide, setVisible] = useState(false);

  const editPW = () => {
    setVisible((prev) => !prev);
  };

  return (
    <div className="justify-center w-full">
      {/* Title */}
      <p className="text-center font-bold text-4xl mb-5">Edit Account</p>

      {/* Labels and Inputs */}
      <div className="mt-10 flex flex-row text-lg">
        {/* Labels */}
        <div className="flex flex-col">
          <p className="mb-7">First Name:</p>
          <p className="mb-7">Last Name:</p>
          <p>Email:</p>
        </div>

        {/* Inputs */}
        <div className="flex flex-col ml-5">
          <input
            placeholder="First Name"
            className="text-lg text-center border border-amber-200 rounded-2xl h-9 mb-4 px-2"
          />
          <input
            placeholder="Last Name"
            className="text-lg text-center border border-amber-200 rounded-2xl h-9 mb-5 px-2"
          />
          <input
            placeholder="Email"
            className="text-lg text-center border border-amber-200 rounded-2xl h-9 mb-5 px-2"
          />
        </div>
      </div>

      {/* Change Password Section */}
      <div className="flex flex-col justify-center mt-5 text-lg">
        <Button
          className="mt-5 bg-black border border-amber-400 text-red-700 text-lg"
          onClick={editPW}
        >
          Change Password
        </Button>

        <input
          placeholder="Old Password"
          className={`text-lg border border-amber-300 text-center mt-5 rounded-2xl h-9 px-2 ${
            hide ? "block" : "hidden"
          }`}
        />
        <input
          placeholder="New Password"
          className={`text-lg border border-amber-300 text-center mt-5 rounded-2xl h-9 px-2 ${
            hide ? "block" : "hidden"
          }`}
        />
        <input
          placeholder="Confirm Password"
          className={`text-lg border border-amber-300 text-center mt-5 rounded-2xl h-9 px-2 ${
            hide ? "block" : "hidden"
          }`}
        />

        <div className="flex justify-center mt-5">
          <Button
            className={`border-3 border-amber-300 rounded-2xl w-12 h-12 p-0 
              bg-gray-200 dark:bg-blue-600 ${hide ? "block" : "hidden"}`}
            onClick={() => setVisible(false)}
          >
            <div className="flex items-center justify-center w-full h-full">
              <FileCheck size={32} />
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EditAccount;
