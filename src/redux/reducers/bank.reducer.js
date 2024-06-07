import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const bankReducer = createReducer(initialState, (builder) => {
	builder
		.addCase("GET_BANKDETAILS_REQUEST", (state) => {
			state.loading = true;
		})
		.addCase("GET_BANKDETAILS_SUCCESS", (state, action) => {
			state.loading = false;
			state.bankdetails = action.payload.bank;
		})
		.addCase("GET_BANKDETAILS_FAILURE", (state, action) => {
			state.loading = false;
		})
		.addCase("REQUEST_WITHDRAWAL_REQUEST", (state) => {
			state.loading = true;
		})
		.addCase("REQUEST_WITHDRAWAL_SUCCESS", (state, action) => {
			state.loading = false;
			state.message = action.payload.message;
		})
		.addCase("REQUEST_WITHDRAWAL_FAILURE", (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})
		.addCase("CLEAR_ERRORS", (state) => {
			state.error = null;
		})
		.addCase("CLEAR_MESSAGES", (state) => {
			state.message = null;
		});
});
