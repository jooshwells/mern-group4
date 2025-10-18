//
import { useState } from "react";
function MainEditor() {
  const [noteTitle, renameNoteTitle] = useState("Untitled Document");

  function renameNote() {
    let noteName = document.querySelector(".noteName") as HTMLInputElement;
    if ((noteName.value = "")) return;
    renameNoteTitle(noteName.value);
  }
  return (
    <div className="ml-5 flex-1 h-[85%] relative border border-amber-400 flex flex-col items-center rounded-lg ">
      <div className="absolute mt-5 border border-amber-300 text-center rounded-lg w-1/2">
        <input
          placeholder={noteTitle}
          className="noteName text-center w-[100%] placeholder-black"
        ></input>
      </div>
      <div className="w-full h-full">
        <input
          onInput={renameNote}
          placeholder="Start typing..."
          className="h-[100%] w-[100%] placeholder:text-center  top-10 placeholder-black ml-5 focus:outline-none"
        ></input>
      </div>
    </div>
  );
}

export default MainEditor;
