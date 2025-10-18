import "./App.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "./components/login-form";
import { SignupForm } from "./components/signup-form";
import { useTheme } from "./components/theme-provider";
import { Textarea } from "@/components/ui/textarea";
import MenuSearch from "./components/MenuSearch";
import DarkMode from "./components/ui/DarkMode";
import { UserRound, Hourglass } from "lucide-react";
import TimerButton from "./components/timerbutton";

import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import MainEditor from "./components/MainEditor";

function App() {
  const { setTheme } = useTheme();

  return (
    <div className="flex h-full min-h-svh w-full items-center justify-center p-6 md:p-10 px-6 flex-col">
      <div className="navbar relative w-full">
        <div className="h-[5%] rounded-lg flex items-center justify-between px-8 py-2 border border-amber-400">
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
          <DarkMode />
        </div>
      </div>

      <div className="h-screen mt-5 w-full flex flex-row relative justify-center">
        <MenuSearch>
          <TimerButton />
        </MenuSearch>
        <MainEditor></MainEditor>
      </div>
    </div>
  );
}

export default App;
