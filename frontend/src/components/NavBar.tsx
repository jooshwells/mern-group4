import React from "react";
import DarkMode from "@/components/ui/DarkMode";
import { UserRound } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  return (
    <div className="navbar relative w-full">
      <div className="h-[5%] rounded-lg flex items-center justify-between px-8 py-2 border border-amber-400 text-current">
        {/* Left menu */}
        <NavigationMenu>
          <NavigationMenuList className="flex items-center gap-4">
            <NavigationMenuItem>
              Website Name
              <NavigationMenuContent>
                <div className="p-4">
                  <NavigationMenuLink>Link</NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right menu */}
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <UserRound />
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="flex flex-col p-2 w-32">
                  <NavigationMenuLink className="px-4 py-2 hover:bg-accent rounded">
                    Account
                  </NavigationMenuLink>
                  <NavigationMenuLink className="px-4 py-2 hover:bg-accent rounded">
                    Settings
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Dark mode toggle */}
        <DarkMode />
      </div>
    </div>
  );
}
