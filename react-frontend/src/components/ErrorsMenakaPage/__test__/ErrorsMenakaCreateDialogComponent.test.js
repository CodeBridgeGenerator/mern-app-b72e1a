import React from "react";
import { render, screen } from "@testing-library/react";

import ErrorsMenakaCreateDialogComponent from "../ErrorsMenakaCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders errorsMenaka create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ErrorsMenakaCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("errorsMenaka-create-dialog-component")).toBeInTheDocument();
});
