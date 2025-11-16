import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { FileCheck, PencilLine } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@radix-ui/react-alert-dialog";
import { AlertDialogFooter, AlertDialogHeader } from "./ui/alert-dialog";

interface EditAccountProps {
  className?: string;
}

function EditAccount({ className }: EditAccountProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    old_password: "",
    password: "",
    confirm_password: "",
  });

  // Fetch current user data on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/user", {
          credentials: "include",
        });
        if (!response.ok) throw new Error(`Error ${response.status}`);
        const data = await response.json();
        if (data.success) {
          setFormData((prev) => ({
            ...prev,
            first_name: data.data.user.first_name,
            last_name: data.data.user.last_name,
            email: data.data.user.email,
          }));
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        toast.error("Failed to load user information");
      }
    };
    fetchUser();
  }, []);

  const togglePWEdit = () => setShowPassword((prev) => !prev);
  const closePWEdit = () => {
    setShowPassword(false);
    // Clear password fields
    setFormData((prev) => ({
      ...prev,
      old_password: "",
      password: "",
      confirm_password: "",
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    // Validation
    if (!formData.first_name || !formData.last_name || !formData.email) {
      toast.error("First name, last name, and email are required.");
      setLoading(false);
      return;
    }

    // Password validation if changing password
    if (showPassword && formData.password) {
      if (formData.password.length < 8) {
        toast.error("Password must be at least 8 characters.");
        setLoading(false);
        return;
      }

      if (formData.password !== formData.confirm_password) {
        toast.error("Passwords do not match.");
        setLoading(false);
        return;
      }

      if (!formData.old_password) {
        toast.error("Please enter your old password.");
        setLoading(false);
        return;
      }
    }

    try {
      // Prepare update payload
      const updatePayload: any = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
      };

      // Only include password fields if changing password
      if (showPassword && formData.password) {
        updatePayload.old_password = formData.old_password;
        updatePayload.password = formData.password;
      }

      const response = await fetch("/api/profile/update-info", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatePayload),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Profile updated successfully!");

        if (showPassword) {
          closePWEdit();
        }

        setTimeout(() => window.location.reload(), 1500);
      } else {
        toast.error(data.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("An error occurred while updating your profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Card className="w-full relative bg-background border-gray-400 border-5">
        <CardHeader>
          <CardTitle className="flex justify-center text-3xl font-bold text-foreground">
            Edit Account
          </CardTitle>
          <CardDescription className="flex justify-center">
            Select any of the fields below to change your account information
          </CardDescription>
        </CardHeader>

        <CardContent className="relative min-h-[16rem]">
          <div className="flex flex-col gap-6 h-full">
            {/* Left column: Name & Email */}
            <div className="flex flex-col gap-6 flex-1">
              {/* First and Last Name side by side */}
              <div className="flex gap-5">
                <div className="flex flex-col flex-1 gap-3">
                  <Label className="font-bold text-foreground">
                    First Name
                  </Label>
                  <Input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    className="rounded-3xl"
                  />
                </div>
                <div className="flex flex-col flex-1 gap-3">
                  <Label className="font-bold text-foreground">Last Name</Label>
                  <Input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    className="rounded-3xl"
                  />
                </div>
              </div>

              {/* Email centered below */}
              <div className="flex justify-center">
                <div className="flex flex-col w-full gap-3">
                  <Label className="font-bold text-center text-foreground">
                    Email
                  </Label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="rounded-3xl"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex justify-center">
                <div className="flex flex-col w-full gap-3">
                  <Label className="font-bold text-center text-foreground">
                    Password
                  </Label>
                  <Input
                    type="password"
                    name="pwkey"
                    value="........"
                    disabled
                    className="rounded-3xl"
                  />
                  {/* Change Password button: always centered */}
                  <div className="relative mt-0 bottom-12 flex justify-end">
                    <Button
                      className="bg-foreground hover:bg-rose-500 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-3xl"
                      onClick={togglePWEdit}
                      type="button"
                    >
                      <PencilLine />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom: password panel */}
            <div
              className="overflow-hidden transition-all duration-300 ease-in-out"
              style={{
                maxHeight: showPassword ? "500px" : "0px",
              }}
            >
              <div
                className={`transition-opacity duration-500 ${
                  showPassword ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="flex gap-5 mt-3">
                  <div className="flex flex-col flex-1 gap-3">
                    <Label className="font-bold">New Password</Label>
                    <Input
                      type="password"
                      name="password"
                      placeholder="New Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="rounded-3xl"
                    />
                  </div>
                  <div className="flex flex-col flex-1 gap-3">
                    <Label className="font-bold">Confirm Password</Label>
                    <Input
                      type="password"
                      name="confirm_password"
                      placeholder="Confirm New Password"
                      value={formData.confirm_password}
                      onChange={handleInputChange}
                      className="rounded-3xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Save button always bottom-right */}
          <div className="w-full flex justify-end mt-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="mr-0 w-10 rounded-4xl bg-foreground hover:bg-primary-500 dark:bg-blue-600 dark:hover:bg-blue-700 text-white disabled:opacity-50"
                  //
                  disabled={loading}
                  type="button"
                >
                  <FileCheck size={20} />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogOverlay className="fixed inset-0 bg-black/50" />

              <AlertDialogContent className="border border-foreground bg-background rounded-3xl p-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Account Changes</AlertDialogTitle>
                  <AlertDialogDescription className="mb-5">
                    Pressing confirm will update the edited fields to the values
                    in the fields
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="border border-foreground rounded-2xl p-2">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleSubmit}
                    className="bg-foreground text-background border border-primary rounded-2xl p-2"
                  >
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default EditAccount;
