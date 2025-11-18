import { TextEditor } from "@/components/text-editor";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Sun, Moon, CheckCircle2Icon } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Timer } from "@/components/timer";
import Draggable from "react-draggable";
import { useRef, useState } from "react";
import { useShortcut } from "@hookies/key-bindings";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function NoteEditorPage() {
  const { setTheme } = useTheme();

  const [noteOpen, setNoteOpen] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState("");
  const [currentNoteTitle, setCurrentNoteTitle] = useState("");
  const [currentNoteContent, setCurrentNoteContent] = useState({
    ops: [],
  });
  const [saving, setSaving] = useState(false);
  useShortcut(
    ["Ctrl", "S"],
    async () => {
      // setSaving(true);
      // await fetch(`/api/notes/${currentNoteId}`, {
      //   method: "PUT",
      //   body: JSON.stringify({
      //     title: currentNoteTitle,
      //     content: JSON.stringify(currentNoteContent),
      //   }),
      //   headers: {
      //     "Content-type": "application/json; charset=UTF-8",
      //   },
      // });
      // setTimeout(() => {
      //   setSaving(false);
      // }, 600);
      await handleSave();
    },
    {
      preventDefault: true,
    }
  );

  const handleSave = async () => {
    setSaving(true);
    await fetch(`/api/notes/${currentNoteId}`, {
      method: "PUT",
      body: JSON.stringify({
        title: currentNoteTitle,
        content: JSON.stringify(currentNoteContent),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    setTimeout(() => {
      setSaving(false);
    }, 1000);
  };

  const nodeRef = useRef(null);

  return (
    <div className="">
      <div className="absolute right-4 z-50 top-4">
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
      <SidebarProvider className="">
        <AppSidebar
          setNoteId={setCurrentNoteId}
          setNoteContent={setCurrentNoteContent}
          noteId={currentNoteId}
          noteContent={currentNoteContent}
          setNoteTitle={setCurrentNoteTitle}
          handleSave={handleSave}
        />

        <SidebarInset className="overflow-clip">
          <header className="flex z-10 top-0 sticky flex-row h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            {/* <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb> */}
            <p className="text-lg">{currentNoteTitle}</p>
            <div
              ref={nodeRef}
              className="sm:bottom-0 relative w-2xs z-50 mx-auto"
            >
              <Timer />
            </div>
          </header>
          {/* Remove the handle prop so that you can click anywhere on the  */}
          {/* <Draggable
            bounds={{ top: 50, left: 500, bottom: 100, right: 100 }}
            handle=".handle"
            nodeRef={nodeRef}
          > */}
          {/* <div
            ref={nodeRef}
            className="sm:top-0 bottom-0 relative w-2xs z-50 right-20 mx-auto"
          >
            <Timer />
          </div> */}
          {/* </Draggable> */}
          <div
            className={`absolute bottom-0  ${
              saving ? "opacity-90" : "opacity-0"
            } z-50 left-1/2  transition-opacity duration-300 transform -translate-y-1/2 -translate-x-1/2 w-1/2`}
          >
            <Alert>
              <CheckCircle2Icon />
              <AlertTitle>Success! Your changes have been saved</AlertTitle>
              <AlertDescription>
                Now get back to work!
              </AlertDescription>
            </Alert>
          </div>
          <div className="h-full">
            {currentNoteId != "" ? (
              <TextEditor
                content={currentNoteContent}
                setContent={setCurrentNoteContent}
              />
            ) : (
              <h1 className="text-center text-xl pt-8">
                Create a new note or edit an existing one to start editing.
              </h1>
            )}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
