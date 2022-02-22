import { render, screen } from '@testing-library/react';
import MapChart from './MapChart';

test('renders map without crashing', () => {
  render(<MapChart />);
  const svgElement = screen.getByTestId('map');
  expect(svgElement).toBeInTheDocument();
});
