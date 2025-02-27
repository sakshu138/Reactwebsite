import React from 'react';
import { render, screen } from '@testing-library/react';
import Cart from '../Pages/Cart';
import CartItems from '../Components/CartItems/CartItems';

// Mock CartItems component to isolate testing
jest.mock('../Components/CartItems/CartItems', () => () => <div>Mock CartItems</div>);

describe('Cart Component', () => {
  test('renders Cart component with CartItems', () => {
    render(<Cart />);
    
    // Check if the CartItems component is rendered by verifying its text content
    expect(screen.getByText('Mock CartItems')).toBeInTheDocument();
  });
});
