import React from 'react';
import { render, screen } from '@testing-library/react';
import Offers from '../Components/Offer/Offer'
import { BrowserRouter as Router } from 'react-router-dom';
import AOS from 'aos';


jest.mock('aos', () => ({
  init: jest.fn(),
}));

describe('Offers Component', () => {
  test('renders Offers component correctly', () => {
    
    render(
        <Router>
          <Offers />
        </Router>
      );

    // Check headings
    expect(screen.getByText('Exclusive')).toBeInTheDocument();
    expect(screen.getByText('Offers For You')).toBeInTheDocument();

    // Check paragraph
    expect(screen.getByText('ONLY ON BEST SELLERS PRODUCTS')).toBeInTheDocument();

    // Check button
    expect(screen.getByRole('button', { name: /Check Now/i })).toBeInTheDocument();

    // Check image
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('alt', '');
  });

  test('calls AOS.init on component mount', () => {
    render(
        <Router>
          <Offers />
        </Router>
      );
    expect(AOS.init).toHaveBeenCalledWith({ duration: 1000 });
  });
});