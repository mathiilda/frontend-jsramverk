import React, { useState, useEffect } from "react";
import "./Toolbar.scss";
import { TextEditor } from "../textEditor/TextEditor";
import { update, create, invite } from "../../data/documents";

export function Toolbar() {
  const [popup, showPopup] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [userId, setUserId] = useState("id");
  const [invited, setInvited] = useState("");
  const [token, setToken] = useState("");

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
    // localStorage.clear();
  };

  const inviteUser = () => {
    invite(localStorage.getItem("id"), invited, token);
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
              className="rounded p-1 pl-3 pr-3 bg-blue-500 shadow"
              onClick={() => updateDoc()}
            >
              <p className="text-gray-100">💾 Save document</p>
            </button>
            <input
              className="ml-6 bg-gray-100 border border-gray-300 rounded mr-2 p-1"
              type="text"
              placeholder="Username"
              value={invited}
              onChange={(event) => setInvited(event?.target.value)}
            />
            <button
              className="rounded-lg p-1 pl-3 pr-3 bg-blue-500 shadow"
              onClick={() => inviteUser()}
            >
              <p className="text-gray-100">Invite</p>
            </button>
          </div>
          <div className="flex">
            <div className="mr-4 mt-1">
              <p>Current user</p>
            </div>

            <button
              className="rounded-lg p-1 pl-3 pr-3 bg-green-600 shadow"
              onClick={() => newDoc()}
            >
              <p className="text-gray-100">New document</p>
            </button>
          </div>
        </div>
        <TextEditor
          shouldFetch={shouldFetch}
          setShouldFetch={setShouldFetch}
          callBackToolbar={callBack}
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
        />
      </div>
    );
  }
}
