import { render, screen } from '@testing-library/react';
import Hero from '../Components/Hero/Hero'; // Adjust this path based on your project structure
import imageList from '../Components/Assets/slider'; // Import imageList if needed

jest.mock('react-slick', () => {
  return ({ children }) => <div>{children}</div>; // Mocking the slider component
});

jest.mock('../Components/Assets/slider', () => [
  { id: 1, image: 'image1.jpg', title: 'Title 1', description: 'Description 1' },
  { id: 2, image: 'image2.jpg', title: 'Title 2', description: 'Description 2' },
  { id: 3, image: 'image3.jpg', title: 'Title 3', description: 'Description 3' },
]);

describe('Hero Component', () => {
  it('should render the Hero component and display the slider', () => {
    render(<Hero />);

    // Check if the images are rendered
    imageList.forEach((image) => {
      const imgElement = screen.getByAltText(`Slide ${image.id}`);
      expect(imgElement).toBeInTheDocument();
      expect(imgElement).toHaveAttribute('src', image.image); // Make sure the image is loading
    });

    // Check if the button is rendered
    const buttonElement = screen.getByText(/Click Me/i);
    expect(buttonElement).toBeInTheDocument();

    // Check if the styles are applied
    expect(buttonElement).toHaveStyle('background-color: #ff4081');
    expect(buttonElement).toHaveStyle('color: white');
    expect(buttonElement).toHaveStyle('font-size: 20px');
  });

  it('should have correct background styling for the container', () => {
    render(<Hero />);
    const container = screen.getByTestId('hero-container'); // Use the test ID here
    expect(container).toHaveStyle('background: linear-gradient(180deg, #fde1ff 30%, #e1ffea22 60%)');
    expect(container).toHaveStyle('background-attachment: fixed');
  });
});
