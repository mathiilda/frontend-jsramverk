import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { TextEditor } from "./SideBar";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("Check if TextEditor is empty.", () => {
  act(() => {
    render(<TextEditor />, container);
  })
  expect(container).not.toBeEmptyDOMElement();
});

it("Check if the text is displayed.", () => {
  act(() => {
    render(<TextEditor />, container);
  })
  expect(container.textContent).toBe("Your documents:");
});