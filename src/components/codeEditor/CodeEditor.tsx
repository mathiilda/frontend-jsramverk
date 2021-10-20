import React from "react";
import Editor from "@monaco-editor/react";

type Props = {
  forwardedRef: any;
};

export function CodeEditor({ forwardedRef }: Props) {
  const saveToLocalStorage = () => {
    let text = forwardedRef.current;
    if (text) {
      localStorage.setItem("text", text.getValue());
    }
  };

  return (
    <div className="editor shadow">
      <Editor
        height="500px"
        width="750px"
        defaultLanguage="javascript"
        defaultValue="Write your code here"
        onMount={(editor, monaco) => (forwardedRef.current = editor)}
        onChange={() => saveToLocalStorage()}
      />
    </div>
  );
}
