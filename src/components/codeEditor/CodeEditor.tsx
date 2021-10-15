import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";

export function CodeEditor() {
  const editorRef = useRef(null);

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
  }

  return (
    <Editor
      height="90vh"
      defaultLanguage="javascript"
      defaultValue="Write your code here"
      onMount={handleEditorDidMount}
    />
  );
}
