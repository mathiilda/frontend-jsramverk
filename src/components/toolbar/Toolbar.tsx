import React, { useState } from "react";
import "./Toolbar.scss";

export function Toolbar() {
  const [dropdown, showDropdown] = useState(false);

  // useEffect(() => {
  //   localStorage.clear();
  // });

  const logLocalStorage = () => {
    console.log(localStorage.getItem("text"));
  };

  return (
    <div className="toolbar">
      <header>
        <p className="logo">JS Editor</p>
        <button onClick={() => showDropdown(!dropdown)}>
          <p>File ▼</p>
        </button>
        <div className={dropdown ? "dropdown" : "dropdown not-visible"}>
          <div className="dropdown-inner">
            <button onClick={() => logLocalStorage()}>
              <p>Save document</p>
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
