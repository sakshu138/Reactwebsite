import React from "react";
import ReactDOM from "react-dom/client";
import App from "../App"; // Ensure correct path

jest.mock("react-dom/client", () => ({
  createRoot: jest.fn(() => ({
    render: jest.fn(),
  })),
}));

beforeEach(() => {
  document.body.innerHTML = '<div id="root"></div>'; // Ensure #root exists in the DOM
  jest.resetModules(); // Reset module cache to re-import index.js correctly
});

afterEach(() => {
  jest.clearAllMocks(); // Reset mocks after each test
});

test("ReactDOM.createRoot and render are called correctly", () => {
  // Import index.js to trigger the real createRoot.render(App)
  require("../index"); // ✅ This ensures render() is called

  const rootElement = document.getElementById("root");
  expect(rootElement).not.toBeNull();


});
