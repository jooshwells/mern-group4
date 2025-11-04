import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { FileCheck } from "lucide-react";
//

interface EditAccountProps {
  className?: string;
}
function EditAccount({ className }: EditAccountProps) {
  /*When Change Password is pressed, make the button go away and make the user confirm current pw
    Bring up 2 fields for entering new pw
    Confirm the change 
    */

  const [hide, setVisible] = useState(false);

  const editPW = () => {
    setVisible((prev) => !prev);
    <p> Please enter your current password</p>;
  };

  const changePW = () => {
    //Check if old password is correct
    useEffect(() => {
      //const getOldPW = ;
    });

    //If not state wrong pw

    //If so display the change password logs

    //If password meets requirements save new pw.
  };

  return (
    <div className="justify-center w-full">
      <p className="text-center font-bold">Edit Account</p>
      <div className="mt-10 flex flex-row">
        <div className="">
          <p className="mb-5">First Name: </p>
          <p className="mb-5">Last Name: </p>

          <p>Email: </p>
        </div>
        <div className="flex flex-col mt-2">
          <input
            placeholder="First Name"
            className=" text-center border border-amber-200 rounded-4xl ml-5 h-5 mb-5"
          ></input>
          <input
            placeholder="Last Name"
            className="text-center border border-amber-200 rounded-4xl ml-5 h-5 mb-5"
          ></input>
          <input
            placeholder="Email"
            className="text-center border border-amber-200 rounded-4xl ml-5 h-5 mb-5"
          ></input>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <Button
          className="mt-5 bg-black border border-amber-400 text-red-700"
          onClick={editPW}
        >
          Change Password
        </Button>
        <input
          placeholder="Old Password"
          className={`border border-amber-300 text-center mt-5 rounded-4xl ${
            hide ? "block" : "hidden"
          }`}
        ></input>
        <input
          placeholder="New Password"
          className={`border border-amber-300 text-center mt-5 rounded-4xl ${
            hide ? "block" : "hidden"
          }`}
        ></input>
        <input
          placeholder="Confirm Password"
          className={` border border-amber-300 text-center mt-5 rounded-4xl ${
            hide ? "block" : "hidden"
          }`}
        ></input>
        <div className="flex justify-center">
          <Button
            className={`border border-amber-300 text-center mt-5 rounded-4xl w-10 ${
              hide ? "block" : "hidden"
            }`}
          >
            <FileCheck />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EditAccount;
