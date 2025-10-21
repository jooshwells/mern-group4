import React, { useRef, useState } from "react";
import ReactQuill, { Quill, type DeltaStatic } from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Button } from "./ui/button";
import { Delta } from "quill";
import type Editor from "quill/core/editor";

export function TextEditor() {
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
    <div>
      <ReactQuill value={value} onChange={handleChange} />
      <p>
        <strong>
          Resultant Json: <br />
        </strong>
        {JSON.stringify(value)}
      </p>
    </div>
  );
}
