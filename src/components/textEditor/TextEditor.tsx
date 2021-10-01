import React, { useState, useEffect, useRef } from "react";
import "./TextEditor.scss";

import { Editor } from "@tinymce/tinymce-react";
import { Login } from "../login/Login";
import { getAll, getSpecific } from "../../data/documents";
import socketIOClient from "socket.io-client";

// const ENDPOINT = "http://127.0.0.1:1337";
// const ENDPOINT = "http://127.0.0.1:1999";
const ENDPOINT = "https://jsramverk-mabw19.azurewebsites.net/";
const socket = socketIOClient(ENDPOINT);

type Props = {
  shouldFetch: boolean;
  setShouldFetch: any;
  callBackToolbar: any;
};

export function TextEditor({
  shouldFetch,
  setShouldFetch,
  callBackToolbar,
}: Props) {
  const editorRef: any = useRef(null);
  const [documents, setDocuments] = useState([]);
  const [title, setTitle] = useState("");

  const [signInUp, setSignInUp] = useState(false);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("id");

  useEffect(() => {
    const getDocuments = async () => {
      let allDocs = await getAll(userId, token);
      setDocuments(allDocs);
    };

    getDocuments();
    socket.on("doc", (data) => {
      editorRef.current.setContent(data.html);
      setTitle(data.title);
    });
  }, []);

  useEffect(() => {
    const getDocuments = async () => {
      let allDocs = await getAll(userId, token);
      setDocuments(allDocs);
    };

    getDocuments();
  }, [shouldFetch, userId, title]);

  if (shouldFetch === true) {
    setShouldFetch(false);
  }

  // Get the document with the matching id and create a new socket for that document.
  const getSpecificDocument = async (id: any) => {
    let specificDocument = await getSpecific(id, userId, token);

    socket.emit("create", id);
    editorRef.current.setContent(specificDocument.text);
    setTitle(specificDocument.title);
  };

  // Save the text in the editor in localStorage.
  const saveToLocalStorage = () => {
    let text = editorRef.current;
    if (text) {
      localStorage.setItem("text", text.getContent());
    }
  };

  // Update the content inside the socket.
  const updateSocket = (event: any) => {
    socket.emit("doc", {
      _id: localStorage.getItem("id"),
      html: editorRef.current.getContent(),
      title: title,
    });
  };

  const signInCallBack = (t: string, uId: string) => {
    setSignInUp(true);
    setToken(t);
    setUserId(uId);
    callBackToolbar(uId, t);
  };

  if (signInUp == true) {
    return (
      <div className="flex flex-row">
        <div className="sidebar bg-gray-700 p-4 shadow w-1/6">
          <input
            className="mb-2 bg-gray-700 border-b border-gray-800 w-full text-gray-200"
            type="text"
            value={title}
            placeholder="Your title here"
            onKeyUp={(event) => {
              updateSocket(event);
            }}
            onChange={(event) => (
              setTitle(event.target.value),
              localStorage.setItem("title", event?.target.value)
            )}
          />
          <div>
            {documents?.map((d) => {
              return (
                <div className="cursor-pointer shadow mt-2 p-2 bg-gray-800 rounded flex flex-row justify-between">
                  <p
                    className="text-gray-200"
                    key={d["name"]}
                    onClick={() => getSpecificDocument(d["_id"])}
                  >
                    {/* 📃 */}
                    {console.log(d["_id"])}
                    {d["title"]}
                  </p>
                  <p title="Share">🔗</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="editor shadow">
          <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            id="textarea"
            init={{
              height: 500,
              width: 900,
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
            onKeyUp={(event) => {
              updateSocket(event);
            }}
            onEditorChange={() => {
              saveToLocalStorage();
            }}
          />
        </div>
      </div>
    );
  } else {
    return <Login callBack={signInCallBack} />;
  }
}
