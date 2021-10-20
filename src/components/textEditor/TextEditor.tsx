import React, { useState, useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Comment } from "../comment/Comment";

type Props = {
  forwardedRef: any;
  callBack: any;
};

export function TextEditor({ forwardedRef, callBack }: Props) {
  const [id, setId] = useState("");
  const [create, setCreate] = useState(true);

  // Save the text in the editor in localStorage.
  const saveToLocalStorage = () => {
    let text = forwardedRef.current;
    if (text) {
      localStorage.setItem("text", text.getContent());
    }
  };

  const checkId = (event: any) => {
    if (event.target.id && event.target.id.length > 10) {
      setId(event.target.id);
      setCreate(false);
      callBack(id);
    } else {
      setCreate(true);
    }
  };

  return (
    <div className="flex flex-row justify-left w-full mt-6">
      <div className="editor shadow z-0">
        <Editor
          onInit={(evt, editor) => (forwardedRef.current = editor)}
          id="textarea"
          init={{
            height: 500,
            width: 750,
            menubar: false,
            placeholder:
              "Create a new document by clicking the 'New document'-button",
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
          onKeyUp={(event) => {
            callBack(event);
          }}
          onEditorChange={() => {
            saveToLocalStorage();
          }}
          onClick={(event) => checkId(event)}
        />
      </div>
      <div className="w-2/6">
        <Comment modeCreate={create} commentId={id} click={!create} />
      </div>
    </div>
  );
}
