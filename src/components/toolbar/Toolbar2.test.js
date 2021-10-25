import React from "react";
import "./matchMedia.mock";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Toolbar } from "./Toolbar";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  localStorage.setItem("test", false);
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("Check if Invite-button is present.", () => {
  localStorage.setItem("test", true);
  act(() => {
    render(<Toolbar />, container);
  })
  expect(container.textContent).toContain("Invite");
});

it("Check if Code editor-button is present", () => {
  localStorage.setItem("test", true);
  act(() => {
    render(<Toolbar />, container);
  })
  expect(container.textContent).toContain("Code editor");
});

it("Check if Invite-button is not present.", () => {
  act(() => {
    render(<Toolbar />, container);
  })
  expect(container.textContent).not.toContain("Invite");
});

it("Check if Code editor-button is not present", () => {
  act(() => {
    render(<Toolbar />, container);
  })
  expect(container.textContent).not.toContain("Code editor");
});