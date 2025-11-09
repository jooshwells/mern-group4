import { Button } from "./ui/button";
import { useState } from "react";
import { FileCheck } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface EditAccountProps {
  className?: string;
}

function EditAccount({ className }: EditAccountProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePWEdit = () => setShowPassword((prev) => !prev);
  const closePWEdit = () => setShowPassword(false);

  return (
    <div className="w-full">
      <Card className="w-full relative">
        <CardHeader>
          <CardTitle className="flex justify-center text-3xl font-bold">Edit Account</CardTitle>
          <CardDescription className="flex justify-center">
            Select any of the fields below to change your account information
          </CardDescription>
        </CardHeader>

        {/* CardContent with reserved min-height */}
        <CardContent className="relative min-h-[16rem]">
          <div className="flex flex-row gap-8 h-full">
            {/* Left column: Name & Email */}
            <div className="flex flex-col gap-6 flex-1">
              {/* First and Last Name side by side */}
              <div className="flex gap-5">
                <div className="flex flex-col flex-1 gap-3">
                  <Label className="font-bold">First Name</Label>
                  <Input type="text" />
                </div>
                <div className="flex flex-col flex-1 gap-3">
                  <Label className="font-bold">Last Name</Label>
                  <Input type="text" />
                </div>
              </div>

              {/* Email centered below */}
              <div className="flex justify-center">
                <div className="flex flex-col w-1/2 gap-3">
                  <Label className="font-bold text-center">Email</Label>
                  <Input type="email" />
                </div>
              </div>

              {/* Change Password button: always centered */}
              <div className="flex justify-center mt-0 w-full absolute bottom-12 left-0">
                <Button
                  className="bg-rose-400 hover:bg-rose-500 dark:bg-amber-600 dark:hover:bg-amber-700 text-white"
                  onClick={togglePWEdit}
                >
                  Change Password
                </Button>
              </div>
            </div>

            {/* Right column: password panel */}
            <div
              className="overflow-hidden transition-all duration-500 flex-shrink-0 flex flex-col gap-5"
              style={{
                maxWidth: showPassword ? "500px" : "0px",
                minWidth: showPassword ? "300px" : "0px",
              }}
            >
              <div className={`transition-opacity duration-500 ${showPassword ? "opacity-100" : "opacity-0"}`}>
                <div className="flex flex-col gap-3">
                  <Label className="font-bold">Old Password</Label>
                  <Input type="password" placeholder="Old Password" />
                </div>
                <div className="flex gap-5 mt-3">
                  <div className="flex flex-col flex-1 gap-3">
                    <Label className="font-bold">New Password</Label>
                    <Input type="password" placeholder="New Password" />
                  </div>
                  <div className="flex flex-col flex-1 gap-3">
                    <Label className="font-bold">Confirm Password</Label>
                    <Input type="password" placeholder="Confirm New Password" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Save button always bottom-right */}
          <div className="absolute bottom-1 right-4">
            <Button
              className="w-10 rounded-4xl bg-rose-400 hover:bg-rose-500 dark:bg-amber-600 dark:hover:bg-amber-700 text-white"
              onClick={closePWEdit}
            >
              <FileCheck size={20} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default EditAccount;
