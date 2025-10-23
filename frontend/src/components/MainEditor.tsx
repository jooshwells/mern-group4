//
import { useState, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
function MainEditor() {
  const [noteTitle, renameNoteTitle] = useState("Untitled Document");
  const notes = useRef<HTMLTextAreaElement>(null);

  function renameNote() {
    let noteName = document.querySelector(".noteName") as HTMLInputElement;
    if ((noteName.value = "")) return;
    renameNoteTitle(noteName.value);
  }
  function writeNotes(num: number) {
    if (notes.current && notes.current === document.activeElement) {
      notes.current.style.border = "none";

      //Set auto margins
      notes.current.style.paddingLeft = "5%";
      notes.current.style.paddingRight = "5%";

      if (notes.current.value.trim() !== "") {
        notes.current.style.paddingTop = "8%";
      }
      notes.current.placeholder = "";
      if (num == 1) {
        notes.current.style.paddingTop = "1%";
        notes.current.style.paddingLeft = "1%";

        notes.current.placeholder = "Start typing...";
      }
    }
  }

  return (
    <div className="ml-5 flex-1 h-[85%] relative border border-amber-400 flex flex-col items-center rounded-lg ">
      <div className="absolute mt-5 border border-amber-300 text-center rounded-lg w-1/2">
        <input
          placeholder={noteTitle}
          className="noteName text-current text-center w-[100%] h-15 text-lg placeholder-current"
        ></input>
      </div>
      <div className="actualNotes w-full h-full items-center justify-center">
        <Textarea
          ref={notes}
          onInput={() => writeNotes(0)}
          onBlur={() => writeNotes(1)}
          placeholder="Start typing..."
          className="h-full w-full pt-[8%] pl-[5%] pr-[5%] text-current placeholder:text-center placeholder-current focus-visible:ring-0 resize-none"
        ></Textarea>
      </div>
    </div>
  );
}

export default MainEditor;
