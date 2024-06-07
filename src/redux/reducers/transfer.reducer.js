import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const transferReducer = createReducer(initialState, (builder) => {
	builder
		.addCase("GET_ALL_TRANSFER_REQUEST_REQUEST", (state) => {
			state.loading = true;
		})
		.addCase("GET_ALL_TRANSFER_REQUEST_SUCCESS", (state, action) => {
			state.loading = false;
			state.allTransfers = action.payload.transfers;
		})
		.addCase("GET_ALL_TRANSFER_REQUEST_FAILURE", (state) => {
			state.loading = false;
			state.alltransfers = null;
		})
		.addCase("GET_TRANSFER_REQUEST_BY_ID_REQUEST", (state) => {
			state.loading = true;
		})
		.addCase("GET_TRANSFER_REQUEST_BY_ID_SUCCESS", (state, action) => {
			state.loading = false;
			state.transfers = action.payload.transfers;
		})
		.addCase("GET_TRANSFER_REQUEST_BY_ID_FAILURE", (state) => {
			state.loading = false;
			state.transfers = null;
		})
		.addCase("GET_SINGLE_TRANSFER_REQUEST", (state) => {
			state.loading = true;
		})
		.addCase("GET_SINGLE_TRANSFER_SUCCESS", (state, action) => {
			state.loading = false;
			state.transfer = action.payload.transfer;
		})
		.addCase("GET_SINGLE_TRANSFER_FAILURE", (state) => {
			state.loading = false;
			state.transfer = null;
		})
		.addCase("PROCESS_TRANSFER_REQUEST_REQUEST", (state) => {
			state.loading = true;
		})
		.addCase("PROCESS_TRANSFER_REQUEST_SUCCESS", (state, action) => {
			state.loading = false;
			state.message = action.payload.message;
		})
		.addCase("PROCESS_TRANSFER_REQUEST_FAILURE", (state, action) => {
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
