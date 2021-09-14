import React, { useState, useEffect, useRef } from "react";
import "./TextEditor.scss";

import { Editor } from "@tinymce/tinymce-react";
import { getAll, getSpecific } from "../../data/documents";

type Props = {
  shouldFetch: boolean;
  setShouldFetch: any;
};

export function TextEditor({ shouldFetch, setShouldFetch }: Props) {
  const editorRef: any = useRef(null);
  const [documents, setDocuments] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const getDocuments = async () => {
      let allDocs = await getAll();
      setDocuments(allDocs);
    };

    getDocuments();
  }, []);

  useEffect(() => {
    const getDocuments = async () => {
      let allDocs = await getAll();
      setDocuments(allDocs);
    };
    getDocuments();
  }, [shouldFetch]);

  const getSpecificDocument = async (id: any) => {
    let specificDocument = await getSpecific(id);
    editorRef.current.setContent(specificDocument.text);
    setTitle(specificDocument.title);
  };

  const saveToLocalStorage = () => {
    if (editorRef.current) {
      localStorage.setItem("text", editorRef.current.getContent());
    }
  };

  if (shouldFetch === true) {
    setShouldFetch(false);
  }

  return (
    <div className="editor">
      <div className="sidebar">
        <input
          type="text"
          value={title}
          placeholder="Your title here"
          onChange={(event) => (
            setTitle(event.target.value),
            localStorage.setItem("title", event?.target.value)
          )}
        />
        <h4>Your documents:</h4>
        <div id="taylor">
          {documents?.map((d) => {
            return (
              <p key={d["name"]} onClick={() => getSpecificDocument(d["_id"])}>
                📃 {d["title"]}
              </p>
            );
          })}
        </div>
      </div>

      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        init={{
          height: 500,
          width: 1500,
          menubar: false,
          placeholder:
            "Create a new document by choosing 'New document' in the 'file'-dropdown.",
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
