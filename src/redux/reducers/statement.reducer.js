import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const statementReducer = createReducer(initialState, (builder) => {
	builder
		.addCase("GET_STATEMENTS_REQUEST", (state) => {
			state.loading = true;
		})
		.addCase("GET_STATEMENTS_SUCCESS", (state, action) => {
			state.loading = false;
			state.statements = action.payload;
		})
		.addCase("GET_STATEMENTS_FAILURE", (state) => {
			state.loading = false;
		})
		.addCase("CLEAR_ERRORS", (state) => {
			state.error = null;
		})
		.addCase("CLEAR_MESSAGES", (state) => {
			state.message = null;
		});
});
