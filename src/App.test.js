import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('react-query', () => ({
  useQuery: () => ({
    isLoading: false,
    error: {},
    data: ['Heathrow Airport', 'Schiphol Airport', 'Frankfurt Airport'],
  }),
}));

test.skip('check UI is rendering', () => {
  render(<App />);

  const pageHeading = screen.getByRole('heading', {
    name: /airport journey planner/i,
  });

  expect(pageHeading).toBeInTheDocument();
});
