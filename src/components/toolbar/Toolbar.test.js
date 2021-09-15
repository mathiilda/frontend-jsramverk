import { render, screen, fireEvent } from '@testing-library/react';
import {Toolbar} from './Toolbar';

test('Check if message is shown after click.', () => {
  const { container } = render(<Toolbar />);
  const message = screen.getByTestId("popupButton");

  fireEvent.click(message);
  expect(screen.getByText("A new document was created! Select the new document in the list to the left. Click on this message to close it.")).toBeInTheDocument();
});