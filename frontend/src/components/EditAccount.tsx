import { Button } from "./ui/button";
import { useState } from "react";
import { FileCheck } from "lucide-react";

import { Label } from "@/components/ui/label";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

interface EditAccountProps {
  className?: string;
}

function EditAccount({ className }: EditAccountProps) {
  const [hide, setVisible] = useState(false);

  const showPWEdit = () => {
    setVisible((prev) => !prev);
  };

  return (
    <div className="w-full">
      <Card className="w-full flex justify-center">
        <CardHeader>
          <CardTitle className="flex justify-center">Edit Account</CardTitle>
          <CardDescription className="flex justify-center">
            Select any of the fields below to change your account information
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/*Wrapper for card content */}

          <div className="">
            <div className="flex flex-row">
              {/*Labels*/}
              <div className="flex flex-col gap-15 mt-3 mb-5">
                <Label>First Name</Label>
                <Label>Last Name</Label>
                <Label>Email</Label>
              </div>
              {/*Input fields for editing*/}
              <div className="flex flex-col gap-10 justify-center ml-5 mb-5">
                <Input type="text" />
                <Input type="text" />
                <Input type="email" />
              </div>
            </div>
            {/*Password Edit Section*/}
            <div className="flex flex-col justify-center gap-5">
              <Button onClick={showPWEdit} className="mb-5 mt-5">
                Change Password
              </Button>
              <Input
                type="password"
                placeholder="Old Password"
                className={`${hide ? "block" : "hidden"} text-center`}
              />
              <Input
                type="password"
                placeholder="New Password"
                className={`${hide ? "block" : "hidden"} text-center`}
              />
              <Input
                type="password"
                placeholder="Confirm New Password "
                className={`${hide ? "block" : "hidden"} text-center mb-5`}
              />
              <Button
                className={`${hide ? "block" : "hidden"} w-10 rounded-4xl`}
              >
                <FileCheck size={10} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default EditAccount;
