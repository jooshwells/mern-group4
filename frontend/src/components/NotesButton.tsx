import { Button } from "./ui/button";
import { NotebookPen } from "lucide-react";

export function NotesButton() {
  return (
    <div>
      <Button variant={"ghost"}>
        <NotebookPen className="scale-200" />
      </Button>
    </div>
  );
}
export default NotesButton;
