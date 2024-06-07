import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const eventReducer = createReducer(initialState, (builder) => {
	builder
		.addCase("REQUEST_EVENT_REQUEST", (state) => {
			state.loading = true;
		})
		.addCase("REQUEST_EVENT_SUCCESS", (state, action) => {
			state.loading = false;
			state.event = action.payload.event;
			state.message = action.payload.message;
		})
		.addCase("REQUEST_EVENT_FAILURE", (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})
		.addCase("GET_ALL_EVENTS_REQUEST", (state) => {
			state.loading = true;
		})
		.addCase("GET_ALL_EVENTS_SUCCESS", (state, action) => {
			state.loading = false;
			state.events = action.payload.events;
		})
		.addCase("GET_ALL_EVENTS_FAILURE", (state, action) => {
			state.loading = false;
		})
		.addCase("ACCEPT_EVENT_REQUEST", (state) => {
			state.loading = true;
		})
		.addCase("ACCEPT_EVENT_SUCCESS", (state, action) => {
			state.loading = false;
			state.events = action.payload.events;
			state.message = action.payload.message;
		})
		.addCase("ACCEPT_EVENT_FAILURE", (state, action) => {
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
