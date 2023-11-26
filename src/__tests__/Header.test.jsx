import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BrowserRouter as Router } from "react-router-dom";

import Header from "../components/layout/Header";
import { Provider } from "react-redux";
import store from "../utils/store";

const renderHeaderWithStore = () => {
  return render(
    <Provider store={store}>
      <Router>
        <Header />
      </Router>
      </Provider>
  );
};

describe("Header", () => {
  it("should load the login button", () => {
    renderHeaderWithStore();

    const loginBtn = screen.getByRole("button", { name: "Login" });
    expect(loginBtn).toBeInTheDocument();

    fireEvent.click(loginBtn);
    expect(loginBtn).toHaveTextContent("Logout");
  });
});
