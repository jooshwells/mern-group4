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
import Navbar from "./components/NavBar";
import MainEditor from "./components/MainEditor";

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

function App() {
  const { setTheme } = useTheme();

  return (
    <div className="flex h-full min-h-svh w-full flex-col items-center justify-center p-6 md:p-10 px-6">
      {/* All text and icons inside this wrapper inherit color */}
      <Navbar />

      <div className="h-screen mt-5 w-full flex flex-row relative justify-center gap-4">
        <MenuSearch>
          <TimerButton />
        </MenuSearch>
        <MainEditor />
      </div>
    </div>
  );
}

export default App;
