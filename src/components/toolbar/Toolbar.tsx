import React, { useState } from "react";
import "./Toolbar.scss";
import { TextEditor } from "../textEditor/TextEditor";
import { CodeEditor } from "../codeEditor/CodeEditor";
import { CreatePDF } from "../popups/CreatePDF";
import {
  update,
  create,
  invite,
  createPDF,
  sendMail,
} from "../../data/documents";

export function Toolbar() {
  const [popup, showPopup] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [userId, setUserId] = useState("id");
  const [invited, setInvited] = useState("");
  const [token, setToken] = useState("");
  const [codeText, setCodeText] = useState(false);

  const updateDoc = () => {
    let text: string | null = localStorage.getItem("text");
    let id: string | null = localStorage.getItem("id");
    let title2: string | null = localStorage.getItem("title");

    if (text !== null && id !== null && title2 !== null) {
      update(id, title2, text, userId, token);
      setShouldFetch(true);
    }
  };

  const newDoc = () => {
    create(userId, token);
    showPopup(!popup);
    setShouldFetch(true);
  };

  const inviteUser = () => {
    let id: string | null = localStorage.getItem("id");

    if (id !== null && invited !== "") {
      sendMail(invited, id, token);
      alert("The email have been sent!");
    } else {
      alert("You need to fill in an email before pressing invite.");
    }
  };

  const createPdf = () => {
    let text: string | null = localStorage.getItem("text");
    let title: string | null = localStorage.getItem("title");

    if (text !== null && title !== null) {
      createPDF(text, title, token);
    }
  };

  const changeEditor = () => {
    setCodeText(!codeText);
    setShouldFetch(true);
  };

  const callBack = (uId: string, t: string) => {
    setUserId(uId);
    setToken(t);
  };

  if (userId !== "id") {
    return (
      <div className="app">
        <div className="flex flex-row justify-between bg-gray-100 text-gray-900 p-4 shadow">
          <div className="flex">
            <button
              className="rounded-lg p-1 pl-3 pr-3 bg-green-600 shadow"
              onClick={() => newDoc()}
            >
              <p className="text-gray-100">New document</p>
            </button>
            <button
              className="rounded-lg p-1 pl-3 pr-3 bg-blue-500 shadow ml-6"
              onClick={() => updateDoc()}
            >
              <p className="text-gray-100">💾 Save document</p>
            </button>
          </div>
          <div className="flex">
            <input
              className="ml-6 bg-gray-100 border border-gray-300 rounded mr-2 p-1"
              type="email"
              placeholder="Email"
              value={invited}
              onChange={(event) => setInvited(event?.target.value)}
            />
            <button
              className="rounded-lg p-1 pl-3 pr-3 bg-purple-600 shadow"
              onClick={() => inviteUser()}
            >
              <p className="text-gray-100">Invite</p>
            </button>
            <button
              className="rounded-lg p-1 pl-3 pr-3 bg-pink-600 shadow ml-6"
              onClick={() => changeEditor()}
            >
              <p className="text-gray-100">
                {codeText ? "Text editor" : "Code editor"}
              </p>
            </button>
            <button
              className="rounded-lg p-1 pl-3 pr-3 bg-purple-600 shadow ml-6"
              onClick={() => createPdf()}
            >
              <p className="text-gray-100">Create pdf</p>
            </button>
          </div>
        </div>
        <TextEditor
          shouldFetch={shouldFetch}
          setShouldFetch={setShouldFetch}
          callBackToolbar={callBack}
          showEditor={true}
        />
      </div>
    );
  } else {
    return (
      <div className="app">
        <div className="flex flex-row justify-between bg-gray-100 text-gray-900 p-4 shadow">
          <div className="ml-auto mr-auto text-xl">JSEditor</div>
        </div>
        <TextEditor
          shouldFetch={shouldFetch}
          setShouldFetch={setShouldFetch}
          callBackToolbar={callBack}
          showEditor={false}
        />
      </div>
    );
  }
}
