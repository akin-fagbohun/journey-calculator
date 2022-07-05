import React from 'react';
import { render, screen } from '@testing-library/react';
import { Hello } from './Hello';

test("renders 'Hello World!'", () => {
  render(<Hello />);

  const myElement = screen.getByText('Hello World!');
  expect(myElement).toBeInTheDocument();
});
