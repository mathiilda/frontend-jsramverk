import "./matchMedia.mock";
import { render, screen, fireEvent } from '@testing-library/react';
import {Toolbar} from './Toolbar';

test('Check if message is shown after clicking pdf-button.', () => {
  localStorage.setItem("test", true);
  localStorage.setItem("text", "test");
  localStorage.setItem("title", "test");

  const { container } = render(<Toolbar />);
  const button = screen.getByTestId("pdf");

  fireEvent.click(button);
  expect(screen.getByText("Your pdf have been created!")).toBeInTheDocument();
});