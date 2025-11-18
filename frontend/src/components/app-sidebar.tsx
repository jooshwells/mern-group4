import * as React from "react";

import { SearchForm } from "@/components/search-form";
import { VersionSwitcher } from "@/components/version-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircleUserRound, Plus, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";

const images = import.meta.glob("../assets/*.jpg", { eager: true, as: "url" });
const profileOptions = Object.values(images);

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Installation",
          url: "#",
        },
        {
          title: "Project Structure",
          url: "#",
        },
      ],
    },
    {
      title: "Building Your Application",
      url: "#",
      items: [
        {
          title: "Routing",
          url: "#",
        },
        {
          title: "Data Fetching",
          url: "#",
          isActive: true,
        },
        {
          title: "Rendering",
          url: "#",
        },
        {
          title: "Caching",
          url: "#",
        },
        {
          title: "Styling",
          url: "#",
        },
        {
          title: "Optimizing",
          url: "#",
        },
        {
          title: "Configuring",
          url: "#",
        },
        {
          title: "Testing",
          url: "#",
        },
        {
          title: "Authentication",
          url: "#",
        },
        {
          title: "Deploying",
          url: "#",
        },
        {
          title: "Upgrading",
          url: "#",
        },
        {
          title: "Examples",
          url: "#",
        },
      ],
    },
    {
      title: "API Reference",
      url: "#",
      items: [
        {
          title: "Components",
          url: "#",
        },
        {
          title: "File Conventions",
          url: "#",
        },
        {
          title: "Functions",
          url: "#",
        },
        {
          title: "next.config.js Options",
          url: "#",
        },
        {
          title: "CLI",
          url: "#",
        },
        {
          title: "Edge Runtime",
          url: "#",
        },
      ],
    },
    {
      title: "Architecture",
      url: "#",
      items: [
        {
          title: "Accessibility",
          url: "#",
        },
        {
          title: "Fast Refresh",
          url: "#",
        },
        {
          title: "Next.js Compiler",
          url: "#",
        },
        {
          title: "Supported Browsers",
          url: "#",
        },
        {
          title: "Turbopack",
          url: "#",
        },
      ],
    },
  ],
};

type propType = {
  noteContent: any;
  noteId: string;
  setNoteContent: (a: any) => void;
  setNoteId: (a: string) => void;
  setNoteTitle: (a: string) => void;
  handleSave: () => void;
};

export function AppSidebar({
  noteContent,
  noteId,
  setNoteContent,
  setNoteId,
  setNoteTitle,
  handleSave,
  ...props
}: propType) {
  // React.ComponentProps<typeof Sidebar>) {
  const [noteData, setNoteData] = useState({
    navMain: [
      {
        title: "Notes",
        _id: "#",
        notes: [{ title: "No notes created", _id: "#", content: "{}" }],
      },
    ],
  });

  const createNote = async (title: string) => {
    await fetch("/api/notes/create", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        content: JSON.stringify({
          ops: [],
        }),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  };

  useEffect(() => {
    fetchUser();
    fetchNotes();
  }, []);

  const [profileIndex, setProfileIndex] = useState(0);

  const fetchUser = async () => {
    try {
      const response = await fetch("/api/auth/user", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setProfileIndex(data.data.user.profile_pic || 0);
        }
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const fetchNotes = () => {
    fetch("/api/notes/")
      .then((response) => response.json())
      .then((data) => {
        if (data.notes.length != 0) {
          setNoteData({
            navMain: [
              {
                title: "Notes",
                _id: "#",
                notes: data.notes,
              },
            ],
          });
        } else {
          setNoteData({
            navMain: [
              {
                title: "Notes",
                _id: "#",
                notes: [{ title: "No notes created", _id: "#", content: "{}" }],
              },
            ],
          });
        }
      });
  };

  const handleCreateNote = async (e: any) => {
    console.log("Created new note");
    e.preventDefault();
    await createNote(e.target.title.value);
    await fetchNotes();
  };

  const handleOpenNote = (id: string, content: string, title: string) => {
    setNoteId(id);
    console.log(id);
    setNoteTitle(title);
    setNoteContent(JSON.parse(content));
    fetchNotes();
  };

  const handleDeleteNote = async (id: string) => {
    await fetch(`/api/notes/${id}`, {
      method: "DELETE",
    });
    if (noteId == id) {
      setNoteId("");
    }
    await fetchNotes();
  };

  const handleSaveButton = async () => {
    await handleSave();
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        {/* <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        /> */}
        {/* <SearchForm /> */}
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {noteData.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className="justify-center mb-1 border-b text-lg">
              {item.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.notes.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <div
                        className={`${noteId == item._id && "bg-border"} mb-1`}
                      >
                        <a
                          onClick={() =>
                            handleOpenNote(item._id, item.content, item.title)
                          }
                          href={"#"}
                          className="grow"
                        >
                          {item.title}
                        </a>
                        {/* <div className="grow"></div> */}
                        <div
                          onClick={() => handleDeleteNote(item._id)}
                          className="rounded-[100%] hover:bg-sidebar-ring p-1"
                        >
                          <Trash2 />
                        </div>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Plus /> New Note
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleCreateNote}>
              <DialogHeader>
                <DialogTitle>Create new note</DialogTitle>
                <DialogDescription>
                  Choose the title of your note. This cannot be changed later.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" name="title" defaultValue="Note Title" />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button className="m-1" type="submit">
                    Save changes
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        <Button onClick={handleSaveButton}>Save (Ctrl+S)</Button>
        <a className="m-auto" href="/profile">
          {/* <Button> */}
          <img
            src={String(profileOptions[profileIndex])}
            alt="User Profile Picture"
            className="rounded-xs hover:bg-sidebar-border"
            style={{ width: "56px", height: "56px" }}
          />
          {/* </Button> */}
        </a>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
