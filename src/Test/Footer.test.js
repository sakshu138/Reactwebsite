// Footer.test.js
import { render, screen } from '@testing-library/react';
import Footer from '../Components/Footer/Footer';
import '@testing-library/jest-dom';

describe('Footer Component', () => {
  test('renders the footer with logo, links, social icons, and copyright', () => {
    render(<Footer />);

    // Check if the footer logo is rendered
    const logo = screen.getByAltText('Shopper Logo');
    expect(logo).toBeInTheDocument();

    // Check if the "SHOPPER" text is rendered
    const shopperText = screen.getByText(/SHOPPER/i);
    expect(shopperText).toBeInTheDocument();

    // Check if the footer links are rendered
    const companyLink = screen.getByText(/Company/i);
    expect(companyLink).toBeInTheDocument();
    const productLink = screen.getByText(/Product/i);
    expect(productLink).toBeInTheDocument();
    const officesLink = screen.getByText(/Offices/i);
    expect(officesLink).toBeInTheDocument();
    const aboutLink = screen.getByText(/About/i);
    expect(aboutLink).toBeInTheDocument();
    const contactLink = screen.getByText(/Contact/i);
    expect(contactLink).toBeInTheDocument();

    // Check if social media icons are rendered
    const instagramIcon = screen.getByAltText('Instagram icon');
    expect(instagramIcon).toBeInTheDocument();
    const pintesterIcon = screen.getByAltText('Pintester icon');
    expect(pintesterIcon).toBeInTheDocument();
    const whatsappIcon = screen.getByAltText('Whatsapp icon');
    expect(whatsappIcon).toBeInTheDocument();

    // Check if the copyright text is rendered
    const copyrightText = screen.getByText(/Copyright @2025 - All rights Reserved/i);
    expect(copyrightText).toBeInTheDocument();
  });
});
