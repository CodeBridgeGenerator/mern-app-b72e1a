import React from "react";
import { render, screen } from "@testing-library/react";

import ErrorsMenakaPage from "../ErrorsMenakaPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders errorsMenaka page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ErrorsMenakaPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("errorsMenaka-datatable")).toBeInTheDocument();
    expect(screen.getByRole("errorsMenaka-add-button")).toBeInTheDocument();
});
