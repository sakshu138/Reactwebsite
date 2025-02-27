import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NewLetter from '../Components/NewLetter/NewLetter';
import { BrowserRouter as Router } from 'react-router-dom';
import AOS from 'aos';

// Mocking AOS library since it's a third-party library
jest.mock('aos', () => ({
  init: jest.fn(),
}));

describe('NewLetter Component', () => {
  beforeEach(() => {
    render(
        <Router>
          <NewLetter />
        </Router>
      );
  });

  test('renders heading and subheading', () => {
    const heading = screen.getByText(/Get Exclusive Offer On Your Email/i);
    const subheading = screen.getByText(/Subscribe to our newsletter and stay updated/i);

    expect(heading).toBeInTheDocument();
    expect(subheading).toBeInTheDocument();
  });

  test('renders email input field and subscribe button', () => {
    const emailInput = screen.getByPlaceholderText(/Your Email id/i);
    const subscribeButton = screen.getByRole('button', { name: /Subscribe/i });

    expect(emailInput).toBeInTheDocument();
    expect(subscribeButton).toBeInTheDocument();
  });

  test('handles email input change correctly', () => {
    const emailInput = screen.getByPlaceholderText(/Your Email id/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    expect(emailInput.value).toBe('test@example.com');
  });

  test('calls AOS.init() on render', () => {
    // Ensure AOS.init is called when the component mounts
    render(
        <Router>
          <NewLetter />
        </Router>
      );
    expect(AOS.init).toHaveBeenCalledWith({ duration: 1000 });
  });
});
