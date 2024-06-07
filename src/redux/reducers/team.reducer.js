import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const teamReducer = createReducer(initialState, (builder) => {
	builder
		.addCase("GET_TEAM_REQUEST", (state) => {
			state.loading = true;
		})
		.addCase("GET_TEAM_SUCCESS", (state, action) => {
			state.loading = false;
			state.teams = action.payload.teams;
		})
		.addCase("GET_TEAM_FAILURE", (state, action) => {
			state.loading = false;
		})
		.addCase("CLEAR_ERRORS", (state) => {
			state.error = null;
		})
		.addCase("CLEAR_MESSAGES", (state) => {
			state.message = null;
		});
});
