import React from "react";
import "./App.scss";

import { Toolbar } from "./components/toolbar/Toolbar";
import { TextEditor } from "./components/textEditor/TextEditor";

function App() {
  return (
    <div className="App">
      <Toolbar />
      <TextEditor />
    </div>
  );
}

export default App;
