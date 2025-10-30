import React, { useRef, useState } from "react";
import ReactQuill, { Quill, type DeltaStatic } from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "./../index.css";
import { Delta } from "quill";

type props = {
  content: any;
  setContent: (a: any) => void;
};

export function TextEditor({ content, setContent, ...props }: props) {
  const [value, setValue] = useState<any>({
    ops: [],
  });

  const handleChange = (
    content: string,
    delta: Delta,
    source: string,
    editor: any
  ) => {
    // Get Delta format from editor
    setContent(editor.getContents());
    // console.log(delta);
  };

  return (
    <div className="h-full bg-accent pb-16 overflow-clip sticky">
      <style>{`.ql-toolbar.ql-snow{ border: 0px solid var(--color-border)
      ; background-color: var(--color-background)}
      .ql-editor.ql-snow{height: 90%; border: 0px solid var(--color-border); overflow: hidden;}
      .ql-container.ql-snow {
        border: 0px;
        margin-bottom: 16px
      }`}</style>
      <ReactQuill
        className="h-[90%] "
        id="quill"
        value={content}
        onChange={handleChange}
      />
    </div>
  );
}
