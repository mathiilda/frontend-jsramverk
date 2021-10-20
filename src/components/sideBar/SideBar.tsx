import React, { useState, useEffect, useRef } from "react";
import "./Sidebar.scss";
// import { Editor } from "@tinymce/tinymce-react";
import { Login } from "../login/Login";
import { TextEditor } from "../textEditor/TextEditor";
import { CodeEditor } from "../codeEditor/CodeEditor";
import { getAll, getSpecific } from "../../data/documents";
import socketIOClient from "socket.io-client";

// const ENDPOINT = "https://jsramverk-mabw19.azurewebsites.net/";
const ENDPOINT = "http://localhost:1337/";
const socket = socketIOClient(ENDPOINT);

type Props = {
  shouldFetch: boolean;
  setShouldFetch: any;
  callBackToolbar: any;
  editor: boolean;
};

export function Sidebar({
  shouldFetch,
  setShouldFetch,
  callBackToolbar,
  editor,
}: Props) {
  const editorRef: any = useRef(null);
  const editorCodeRef: any = useRef(null);
  const [signInUp, setSignInUp] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [title, setTitle] = useState("");
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("id");

  useEffect(() => {
    const getDocuments = async () => {
      let allDocs = await getAll(userId, token, editor);
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
      let allDocs = await getAll(userId, token, editor);
      setDocuments(allDocs);
    };

    getDocuments();
  }, [shouldFetch, userId, title, editor]);

  if (shouldFetch === true) {
    setShouldFetch(false);
  } // KOLLA DENNA

  // Get the document with the matching id and create a new socket for that document.
  const getSpecificDocument = async (id: any) => {
    console.log(id);

    let specificDocument = await getSpecific(id, userId, token);

    socket.emit("create", id);
    if (editor === false) {
      editorRef.current.setContent(specificDocument.text);
    } else if (editor === true) {
      editorCodeRef.current.setValue(specificDocument.text);
    }
    setTitle(specificDocument.title);
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

  const textEditorCallBack = (event: any) => {
    updateSocket(event);
  };

  if (signInUp == true) {
    return (
      <div className="flex flex-row">
        <div className="flex flex-row w-2/6">
          <div className="sidebar bg-gray-700 p-4 shadow">
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
                      {d["title"]}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="editor shadow z-0"></div>
        </div>
        <div className="w-full">
          {editor ? (
            <CodeEditor forwardedRef={editorCodeRef} />
          ) : (
            <div className="">
              <TextEditor
                forwardedRef={editorRef}
                callBack={textEditorCallBack}
              />
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return <Login callBack={signInCallBack} />;
  }
}
