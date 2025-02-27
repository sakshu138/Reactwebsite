import React, { useContext , useState  } from "react"; // ✅ Add useContext
import { render, act , waitFor } from "@testing-library/react";
import { ShopContext } from "../Context/ShopContext";
import ShopContextProvider from "../Context/ShopContext";



  

describe("ShopContextProvider", () => {


  test("addToCart correctly updates cartItems", () => {
    let capturedContext = null;
  
    const TestComponent = () => {
      const context = useContext(ShopContext);
      const [, setRender] = useState(0);
  
      React.useEffect(() => {
        capturedContext = context;
        setRender((prev) => prev + 1);
      }, [context.cartItems]);
  
      return null;
    };
  
    render(
      <ShopContextProvider>
        <TestComponent />
      </ShopContextProvider>
    );
  
    act(() => {
      capturedContext.addToCart(1, "M"); // Add product with ID 1 and size M
    });
  
    const cartKey = " 1-M"; // Ensure the key format matches your ShopContext logic
  
    expect(capturedContext.cartItems).toHaveProperty(cartKey, 1);
  });

  test("removeFromCart decreases quantity and removes if 0", () => {
    let capturedContext = null;
  
    const TestComponent = () => {
      const context = useContext(ShopContext);
      const [, setRender] = useState(0);
  
      React.useEffect(() => {
        capturedContext = context;
        setRender((prev) => prev + 1);
      }, [context.cartItems]);
  
      return null;
    };
  
    render(
      <ShopContextProvider>
        <TestComponent />
      </ShopContextProvider>
    );
  
    act(() => {
      capturedContext.addToCart(5, "M"); // Add an item
    });
  
    act(() => {
      capturedContext.removeFromCart(5, "M"); // Remove the item
    });
  
    const cartKey = "5-M"; // Ensure key format matches
  
    expect(capturedContext.cartItems[cartKey]).toBeUndefined(); // Item should be removed
  });

  
test("increment function increases quantity", () => {
    let capturedContext = null;
  
    const TestComponent = () => {
      const context = useContext(ShopContext);
      const [, setRender] = useState(0);
  
      React.useEffect(() => {
        capturedContext = context;
        setRender((prev) => prev + 1);
      }, [context.cartItems]);
  
      return null;
    };
  
    render(
      <ShopContextProvider>
        <TestComponent />
      </ShopContextProvider>
    );
  
    act(() => {
      capturedContext.addToCart(3, "S"); // Ensure the item is added first
    });
  
    act(() => {
      capturedContext.increment(3, "S"); // Then increment it
    });
  
    const cartKey = " 3-S"; // Make sure this matches your actual implementation
  
    expect(capturedContext.cartItems[cartKey]).toBe(2);
  });


  test("deleteFromCart removes item completely", () => {
    let contextValue;
  
    // Component to access context
    const TestComponent = () => {
      contextValue = useContext(ShopContext);
      return null;
    };
  
    render(
      <ShopContextProvider>
        <TestComponent />
      </ShopContextProvider>
    );
  
    act(() => {
      contextValue.addToCart(5, "M");
      contextValue.deleteFromCart(5, "M");
    });
  
    // Ensure that the cartKey is correct (remove extra space)
    const cartKey = "5-M";
  
    expect(contextValue.cartItems[cartKey]).toBeUndefined();
  });

  test("placeOrder moves cart items to order history and resets cart", async () => {
    let contextValue;
  
    // Component to extract context
    const TestComponent = () => {
      contextValue = useContext(ShopContext);
      return null;
    };
  
    render(
      <ShopContextProvider>
        <TestComponent />
      </ShopContextProvider>
    );
  
    act(() => {
      contextValue.addToCart(1, "M");
      contextValue.addToCart(2, "L");
    });
  
    // Log cartItems before placing order
    console.log("Cart before order:", contextValue.cartItems);
  
    await act(async () => {
      contextValue.placeOrder();
    });
  
    console.log("Order history after order:", contextValue.orderHistory);
  
    expect(contextValue.orderHistory.length).toBeGreaterThan(0);
    expect(contextValue.cartItems).toEqual({}); // Cart should be reset
  });

  test("getTotalCartAmount calculates correct total", () => {
    let contextValue;
  
    // Component to access the context inside the test
    const TestComponent = () => {
      contextValue = useContext(ShopContext);
      return null;
    };
  
    render(
      <ShopContextProvider>
        <TestComponent />
      </ShopContextProvider>
    );
  
    act(() => {
      contextValue.addToCart(1, "M");
      contextValue.addToCart(2, "L");
    });
  
    expect(contextValue.getTotalCartAmount()).toBe(
      contextValue.all_product.find((p) => p.id === 1).new_price +
      contextValue.all_product.find((p) => p.id === 2).new_price
    );
  });
});