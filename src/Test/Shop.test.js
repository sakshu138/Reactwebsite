import { render, screen } from "@testing-library/react";
import Shop from "../Pages/Shop"; // Adjust the path if needed
import Hero from "../Components/Hero/Hero";
import Popular from "../Components/Popular/Popular";
import Offer from "../Components/Offer/Offer";
import NewCollection from "../Components/NewCollection/NewCollection";
import NewLetter from "../Components/NewLetter/NewLetter";

// Mock child components with identifiable text
jest.mock("../Components/Hero/Hero", () => () => <div>Hero Section</div>);
jest.mock("../Components/Popular/Popular", () => () => <div>Popular Section</div>);
jest.mock("../Components/Offer/Offer", () => () => <div>Offer Section</div>);
jest.mock("../Components/NewCollection/NewCollection", () => () => <div>New Collection Section</div>);
jest.mock("../Components/NewLetter/NewLetter", () => () => <div>Newsletter Section</div>);

describe("Shop Component", () => {
  test("renders Shop page with all sections", () => {
    render(<Shop />);

    // Verify that all sections are rendered based on text content
    expect(screen.getByText("Hero Section")).toBeInTheDocument();
    expect(screen.getByText("Popular Section")).toBeInTheDocument();
    expect(screen.getByText("Offer Section")).toBeInTheDocument();
    expect(screen.getByText("New Collection Section")).toBeInTheDocument();
    expect(screen.getByText("Newsletter Section")).toBeInTheDocument();
  });
});
