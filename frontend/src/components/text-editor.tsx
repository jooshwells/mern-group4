import React, { useRef, useState } from "react";
import ReactQuill, { Quill, type DeltaStatic } from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "./../index.css";
import { Delta } from "quill";

export function TextEditor({ ...props }) {
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
    setValue(editor.getContents());
    console.log();
  };

  return (
    <div className=" sticky">
      <style>{`.ql-toolbar.ql-snow{ border: 1px solid var(--color-border),
      ;
      border-top: 0px solid white; z-index: 1;}
      .ql-container.ql-snow{border: 1px solid var(--color-border);}`}</style>
      <ReactQuill
        className="l"
        id="quill"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
