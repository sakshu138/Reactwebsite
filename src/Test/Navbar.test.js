import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import Navbar from '../Components/Navbar/Navbar';

describe('Navbar Component', () => {
  const mockContextValue = {
    getTotalCartItems: jest.fn(() => 0), // Mock function returning 0 items
  };

  const renderWithContext = () => {
    return render(
      <BrowserRouter>
        <ShopContext.Provider value={mockContextValue}>
          <Navbar />
        </ShopContext.Provider>
      </BrowserRouter>
    );
  };

  test('Clicking on "Shop" should set active menu to "shop"', async () => {
    renderWithContext();

    // Debug output to inspect rendered HTML
    screen.debug();  

    // Try selecting the <Link> instead of using getByText
    const shopLink = screen.getByRole('link', { name: /shop/i });
    expect(shopLink).toBeTruthy();  // Ensure it exists before proceeding

    const shopLi = shopLink.closest('li');
    expect(shopLi).toBeTruthy();

    fireEvent.click(shopLi);

    await waitFor(() => {
      expect(shopLi.innerHTML).toContain('<hr>');
    });
  });


  test('Clicking on "Mens" should set active menu to "mens"', async () => {
    renderWithContext();
    const allListItems = screen.getAllByRole('listitem');
    const mensLi = allListItems.find((li) => li.textContent.toLowerCase().includes('mens'));

    expect(mensLi).toBeTruthy(); // Ensure element exists
    fireEvent.click(mensLi);

    await waitFor(() => {
      expect(mensLi.innerHTML).toContain('<hr>');
    });
  });


  test('Clicking on "Womens" should set active menu to "womens"', async () => {
    renderWithContext();
    const womensLink = screen.getByText(/womens/i);
    fireEvent.click(womensLink);

    await waitFor(() => {
      expect(womensLink.parentElement.innerHTML).toContain('<hr>');
    });
  });

  test('Clicking on "Kids" should set active menu to "kids"', async () => {
    renderWithContext();
    const kidsLink = screen.getByText(/kids/i);
    fireEvent.click(kidsLink);

    await waitFor(() => {
      expect(kidsLink.parentElement.innerHTML).toContain('<hr>');
    });
  });
});
