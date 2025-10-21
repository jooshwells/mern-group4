import "./App.css";
import { Moon, Sun } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "./components/login-form";
import { SignupForm } from "./components/signup-form";
import { useTheme } from "./components/theme-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { Button } from "./components/ui/button";
import { GitHubLink } from "./components/github";

function App() {
  const { setTheme } = useTheme();

  return (
    <div className="flex flex-col-reverse h-full min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="absolute left-4 top-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.5rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Tabs className="w-full max-w-md ">
        <TabsList>
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
        <TabsContent value="signup">
          <SignupForm />
        </TabsContent>
      </Tabs>

      <div className="absolute right-4 top-4">
        <GitHubLink />
      </div>
      <div className="mx-auto">
        <h1 className="text-[112px] font-normal tracking-widest">NANTA</h1>
        <p className="text-center text-xl font-medium tracking-wider text-muted-foreground [word-spacing:1em]">
          Not Another Note Taking App
        </p>
      </div>
    </div>
  );
}

export default App;
