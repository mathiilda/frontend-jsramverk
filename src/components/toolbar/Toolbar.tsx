import React, { useState } from "react";
import "./Toolbar.scss";
import { TextEditor } from "../textEditor/TextEditor";
import { update, create } from "../../data/documents";

export function Toolbar() {
  const [dropdown, showDropdown] = useState(false);
  const [popup, showPopup] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(false);

  const updateDoc = () => {
    let text: string | null = localStorage.getItem("text");
    let id: string | null = localStorage.getItem("id");
    let title2: string | null = localStorage.getItem("title");

    if (text !== null && id !== null && title2 !== null) {
      console.log(text, id, title2);

      update(id, title2, text);
      setShouldFetch(true);
    }
  };

  const newDoc = () => {
    localStorage.clear();
    create();
    showPopup(!popup);
    setShouldFetch(true);
  };

  return (
    <div className="app">
      <div className="toolbar">
        <header>
          <div className="inner-header">
            <p className="logo">JS Editor</p>
            <button onClick={() => showDropdown(!dropdown)}>
              <p>File ▼</p>
            </button>
            <div className={dropdown ? "dropdown" : "dropdown not-visible"}>
              <div className="dropdown-inner">
                <button onClick={() => updateDoc()}>
                  <p>Save document</p>
                </button>
                <button onClick={() => newDoc()}>
                  <p>New document</p>
                </button>
              </div>
            </div>
          </div>

          <div
            onClick={() => showPopup(!popup)}
            className={popup ? "popup" : "popup not-visible"}
          >
            <p>
              A new document was created! Select the new document in the list to
              the left. Click on this message to close it.
            </p>
          </div>
        </header>
      </div>
      <TextEditor shouldFetch={shouldFetch} setShouldFetch={setShouldFetch} />
    </div>
  );
}
