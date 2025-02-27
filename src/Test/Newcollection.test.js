import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // If routing is used
import NewCollection from '../Components/NewCollection/NewCollection'; // Adjust path as necessary
import AOS from 'aos';

// Mock the `new_collection` import to avoid external dependencies
jest.mock('../Components/Assets/new_collections', () => [
  {
    id: 1,
    name: 'Test Item 1',
    image: 'image1.jpg',
    new_price: 100,
    old_price: 120,
  },
  {
    id: 2,
    name: 'Test Item 2',
    image: 'image2.jpg',
    new_price: 150,
    old_price: 180,
  },
]);

// Mock AOS initialization
jest.mock('aos', () => ({
  init: jest.fn(),
}));

global.scrollTo = jest.fn();

describe('NewCollection Component', () => {
  // Test if the component renders the New Collection title and items correctly
  test('renders New Collection title and items', () => {
    render(
      <Router>
        <NewCollection />
      </Router>
    );
    
    // Check if the title "NEW COLLECTIONS" is rendered
    expect(screen.getByText('NEW COLLECTIONS')).toBeInTheDocument();
    
    // Check if item names are rendered
    expect(screen.getByText('Test Item 1')).toBeInTheDocument();
    expect(screen.getByText('Test Item 2')).toBeInTheDocument();
    
    // Check if prices are displayed correctly
    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByText('$120')).toBeInTheDocument();
    expect(screen.getByText('$150')).toBeInTheDocument();
    expect(screen.getByText('$180')).toBeInTheDocument();
  });

  // Test AOS initialization and scroll to top on mount
  test('initializes AOS and scrolls to top on mount', async () => {
    render(
      <Router>
        <NewCollection />
      </Router>
    );

    // Wait for AOS to initialize
    await waitFor(() => {
      expect(AOS.init).toHaveBeenCalledTimes(1); // Ensure AOS is initialized
      expect(AOS.init).toHaveBeenCalledWith({ duration: 1000 }); // Check if it's called with the correct options
    });

    // Check if window.scrollTo is called with (0, 0)
    expect(global.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  // Test the number of rendered items (images in this case)
  test('renders correct number of items', () => {
    render(
      <Router>
        <NewCollection />
      </Router>
    );

    // Ensure that the number of rendered items matches the length of the mock data
    expect(screen.getAllByRole('img')).toHaveLength(2); // Check for 'img' elements rendered by the Item component
  });
});
