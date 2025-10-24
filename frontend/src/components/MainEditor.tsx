//
import { useState, useRef } from "react";
import ReactQuill, { Quill, type DeltaStatic } from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Delta } from "quill";
import type Editor from "quill/core/editor";

function MainEditor() {
  const [noteTitle, renameNoteTitle] = useState("Untitled Document");
  const [value, setValue] = useState<any>({ ops: [] });

  function renameNote() {
    let noteName = document.querySelector(".noteName") as HTMLInputElement;
    if ((noteName.value = "")) return;
    renameNoteTitle(noteName.value);
  }
  const handleChange = (
    content: string,
    delta: any,
    source: string,
    editor: any
  ) => {
    // Get Delta format from editor

    setValue(editor.getContents());

    console.log();
  };

  return (
    <div className="ml-5 flex-1 h-[85%] relative border border-amber-400 flex flex-col items-center rounded-lg ">
      <div className="absolute mt-5 border border-amber-300 text-center rounded-lg w-1/2">
        <input
          placeholder={noteTitle}
          className="noteName text-current text-center w-[100%] h-15 text-lg placeholder-current"
        ></input>
      </div>
      <div className="actualNotes w-full h-full items-center justify-center">
        <ReactQuill
          value={value}
          onChange={setValue}
          className="h-[90%] w-full" // ReactQuill has its own styling
          theme="snow"
        />
      </div>
    </div>
  );
}

export default MainEditor;
