import { render, screen } from '@testing-library/react';
import App from './App';

test('renders input', () => {
  render(<App />);
  const inputElement = screen.getByTestId('ip-address');
  expect(inputElement).toBeInTheDocument();
});

test('renders button', () => {
  render(<App />);
  const buttonElement = screen.getByText('Get Location');
  expect(buttonElement).toBeInTheDocument();
});
