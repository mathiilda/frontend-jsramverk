import React, { useRef } from "react";
import "./TextEditor.scss";
import { Editor } from "@tinymce/tinymce-react";

export function TextEditor() {
  const editorRef: any = useRef(null);
  const saveToLocalStorage = () => {
    if (editorRef.current) {
      localStorage.setItem("text", editorRef.current.getContent());
    }
  };

  return (
    <div className="editor">
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        init={{
          height: 500,
          width: 1100,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        onEditorChange={() => saveToLocalStorage()}
      />
    </div>
  );
}
