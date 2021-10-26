import React, { useState } from "react";
import { Sidebar } from "../sideBar/SideBar";
import {
  update,
  create,
  createPDF,
  sendMail,
  executeCode,
} from "../../data/documents";

export function Toolbar() {
  const [popup, showPopup] = useState(false);
  const [popupText, setPopupText] = useState("");
  const [shouldFetch, setShouldFetch] = useState(false);
  const [userId, setUserId] = useState("id");
  const [invited, setInvited] = useState("");
  const [token, setToken] = useState("");
  const [codeText, setCodeText] = useState(false);

  const callBack = (uId: string, t: string) => {
    setUserId(uId);
    setToken(t);
  };

  const changeEditor = () => {
    setCodeText(!codeText);
    setShouldFetch(true);
  };

  const createPdf = () => {
    let text: string | null = localStorage.getItem("text");
    let title: string | null = localStorage.getItem("title");

    if (text !== null && title !== null) {
      createPDF(text, title, token);
      showPopup(true);
      setPopupText("Your pdf have been created!");
    }
  };

  const inviteUser = () => {
    let id: string | null = localStorage.getItem("id");
    showPopup(true);

    if (id !== null && invited !== "") {
      sendMail(invited, id, token);
      setPopupText("📤 Your email have been sent!");
    } else {
      setPopupText("⚠️ You need to fill in an email before pressing invite.");
    }
  };

  const newDoc = async () => {
    await create(userId, token, codeText);
    setShouldFetch(true);
  };

  const runCode = async () => {
    let text: string | null = localStorage.getItem("text");

    if (text !== null) {
      await executeCode(text);
    }
  };

  const updateDoc = async () => {
    let text: string | null = localStorage.getItem("text");
    let id: string | null = localStorage.getItem("id");
    let title2: string | null = localStorage.getItem("title");

    if (text !== null && id !== null && title2 !== null) {
      await update(id, title2, text, userId, token);
      setShouldFetch(true);
    }
  };

  if (userId !== "id" || localStorage.getItem("test") == "true") {
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
          <div
            className={
              popup ? " p-2 rounded shadow z-100 bg-gray-200" : "hidden"
            }
            onClick={() => showPopup(false)}
          >
            <p>{popupText}</p>
          </div>
          <div className="flex">
            <input
              className="ml-6 bg-gray-100 border border-gray-300 rounded mr-2 p-1"
              type="email"
              placeholder="Email"
              value={invited}
              onChange={(event) => setInvited(event?.target.value)}
              data-testid="mail"
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
            {codeText ? (
              <button
                className="rounded-lg p-1 pl-3 pr-3 bg-blue-500 shadow ml-6"
                onClick={() => runCode()}
              >
                <p className="text-gray-100">Run code</p>
              </button>
            ) : (
              <button
                className="rounded-lg p-1 pl-3 pr-3 bg-purple-600 shadow ml-6"
                onClick={() => createPdf()}
                data-testid="pdf"
              >
                <p className="text-gray-100">Create pdf</p>
              </button>
            )}
          </div>
        </div>
        <Sidebar
          shouldFetch={shouldFetch}
          setShouldFetch={setShouldFetch}
          callBackToolbar={callBack}
          editor={codeText}
        />
      </div>
    );
  } else {
    return (
      <div className="app">
        <div className="flex flex-row justify-between bg-gray-100 text-gray-900 p-4 shadow">
          <div className="ml-auto mr-auto text-xl">JSEditor</div>
        </div>
        <Sidebar
          shouldFetch={shouldFetch}
          setShouldFetch={setShouldFetch}
          callBackToolbar={callBack}
          editor={codeText}
        />
      </div>
    );
  }
}
