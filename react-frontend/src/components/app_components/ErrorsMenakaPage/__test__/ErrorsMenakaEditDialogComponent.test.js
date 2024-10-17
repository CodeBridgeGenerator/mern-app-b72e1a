import React from "react";
import { render, screen } from "@testing-library/react";

import ErrorsMenakaEditDialogComponent from "../ErrorsMenakaEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders errorsMenaka edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ErrorsMenakaEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("errorsMenaka-edit-dialog-component")).toBeInTheDocument();
});
