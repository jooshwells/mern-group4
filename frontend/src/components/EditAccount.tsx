import { Button } from "./ui/button";

//
function EditAccount() {
  /*When Change Password is pressed, make the button go away and make the user confirm current pw
    Bring up 2 fields for entering new pw
    Confirm the change 
    */

  function changePW() {
    <p> Please enter your current password</p>;
  }
  return (
    <div className="justify-center w-full">
      <p className="text-center">Edit Account</p>
      <div className="mt-20 flex flex-row">
        <div className="">
          <p className="mb-5">Username: </p>
          <p>Email: </p>
        </div>
        <div className="flex flex-col mt-2">
          <input
            placeholder="Username"
            className=" text-center border border-amber-200 rounded-4xl ml-5 h-5 mb-5"
          ></input>
          <input
            placeholder="Email"
            className="text-center border border-amber-200 rounded-4xl ml-5 h-5 mb-5"
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <Button className="mt-5">Change Password</Button>
      </div>
    </div>
  );
}

export default EditAccount;
