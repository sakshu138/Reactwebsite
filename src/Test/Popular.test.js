import { render, screen } from '@testing-library/react';
import Popular from '../Components/Popular/Popular';
import { BrowserRouter } from 'react-router-dom';

// Mocking the data_product for testing
jest.mock('../Components/Assets/data', () => [
  {
    id: 1,
    name: "Dress",
    image: "path_to_image_1",
    new_price: 20,
    old_price: 40,
  },
  {
    id: 2,
    name: "Shoes",
    image: "path_to_image_2",
    new_price: 50,
    old_price: 70,
  },
]);

describe('Popular Component', () => {
  test('renders Popular section with correct elements', () => {
    render(
      <BrowserRouter>
        <Popular />
      </BrowserRouter>
    );

    // Check if the title is rendered
    expect(screen.getByText(/POPULAR IN WOMEN/i)).toBeInTheDocument();

    // Check if the horizontal line exists
    expect(screen.getByRole('separator')).toBeInTheDocument();

    // Check if the items are rendered based on the mock data
    expect(screen.getByText(/Dress/)).toBeInTheDocument();
    expect(screen.getByText(/Shoes/)).toBeInTheDocument();

    // Check if the prices are displayed
    expect(screen.getByText(/\$20/)).toBeInTheDocument();
    expect(screen.getByText(/\$40/)).toBeInTheDocument();
    expect(screen.getByText(/\$50/)).toBeInTheDocument();
    expect(screen.getByText(/\$70/)).toBeInTheDocument();
  });
});

