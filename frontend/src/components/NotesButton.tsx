import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { NotebookPen } from "lucide-react";

export function NotesButton() {
  const navigate = useNavigate();

  const redirectNotes = () => {
    navigate("/edit");
  };

  return (
    <div>
      <Button variant={"ghost"} onClick={redirectNotes}>
        <NotebookPen className="scale-200" />
      </Button>
    </div>
  );
}
export default NotesButton;
