import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const userReducer = createReducer(initialState, (builder) => {
	builder
		.addCase("GENERATE_RESET_TOKEN_REQUEST", (state) => {
			state.loading = true;
			state.isAuthenticated = false;
		})
		.addCase("GENERATE_RESET_TOKEN_SUCCESS", (state, action) => {
			state.loading = false;
			state.user = action.payload.user;
			state.message = action.payload.message;
			state.isAuthenticated = true;
		})
		.addCase("GENERATE_RESET_TOKEN_FAILURE", (state) => {
			state.loading = false;
			state.error = "Invalid Credentials";
			state.isAuthenticated = false;
		})
		.addCase("TRACK_USER_REQUEST", (state) => {
			state.loading = true;
		})
		.addCase("TRACK_USER_SUCCESS", (state, action) => {
			state.loading = false;
			state.track = action.payload.track;
		})
		.addCase("TRACK_USER_FAILURE", (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})
		.addCase("FORGOT_PASSWORD_REQUEST", (state) => {
			state.loading = true;
			state.isAuthenticated = false;
		})
		.addCase("FORGOT_PASSWORD_SUCCESS", (state, action) => {
			state.loading = false;
			state.user = action.payload.user;
			state.message = action.payload.message;
			state.isAuthenticated = true;
		})
		.addCase("FORGOT_PASSWORD_FAILURE", (state) => {
			state.loading = false;
			state.error = "Invalid Credentials";
			state.isAuthenticated = false;
		})
		.addCase("GET_LOGIN_REQUEST", (state) => {
			state.loading = true;
			state.isAuthenticated = false;
		})
		.addCase("GET_LOGIN_SUCCESS", (state, action) => {
			state.loading = false;
			state.user = action.payload.user;
			state.message = action.payload.message;
			state.isAuthenticated = true;
		})
		.addCase("GET_LOGIN_FAILURE", (state) => {
			state.loading = false;
			state.error = "Invalid Credentials";
			state.isAuthenticated = false;
		})
		.addCase("UPDATE_PROFILE_REQUEST", (state) => {
			state.loading = true;
		})
		.addCase("UPDATE_PROFILE_SUCCESS", (state, action) => {
			state.loading = false;
			state.user = action.payload.user;
			state.message = action.payload.message;
		})
		.addCase("UPDATE_PROFILE_FAILURE", (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})
		.addCase("GET_SIGNUP_REQUEST", (state) => {
			state.loading = true;
			state.isAuthenticated = false;
		})
		.addCase("GET_SIGNUP_SUCCESS", (state, action) => {
			state.loading = false;
			state.user = action.payload.user;
			state.message = action.payload.message;
			state.referralCode = action.payload.referralCode;
			state.isAuthenticated = true;
		})
		.addCase("GET_SIGNUP_FAILURE", (state, action) => {
			state.loading = false;
			state.error = action.payload;
			state.referralCode = null;
			state.isAuthenticated = false;
		})
		.addCase("ADD_REFERRAL_REQUEST", (state) => {
			state.loading = true;
		})
		.addCase("ADD_REFERRAL_SUCCESS", (state) => {
			state.loading = false;
		})
		.addCase("ADD_REFERRAL_FAILURE", (state) => {
			state.loading = false;
		})
		.addCase("GET_LOGOUT_REQUEST", (state) => {
			state.loading = true;
			state.isAuthenticated = true;
		})
		.addCase("GET_LOGOUT_SUCCESS", (state, action) => {
			state.loading = false;
			state.user = null;
			state.message = action.payload;
			state.isAuthenticated = false;
		})
		.addCase("GET_LOGOUT_FAILURE", (state, action) => {
			state.loading = false;
			state.error = action.payload;
			state.isAuthenticated = true;
		})
		.addCase("LOAD_USER_REQUEST", (state) => {
			state.loading = true;
			state.isAuthenticated = true;
		})
		.addCase("LOAD_USER_SUCCESS", (state, action) => {
			state.loading = false;
			state.user = action.payload;
			state.isAuthenticated = true;
		})
		.addCase("LOAD_USER_FAILURE", (state) => {
			state.loading = false;
			state.isAuthenticated = false;
		})
		.addCase("GET_ALL_USERS_REQUEST", (state) => {
			state.loading = true;
		})
		.addCase("GET_ALL_USERS_SUCCESS", (state, action) => {
			state.loading = false;
			state.users = action.payload;
		})
		.addCase("GET_ALL_USERS_FAILURE", (state) => {
			state.loading = false;
		})
		.addCase("GET_ACTIVE_USERS_REQUEST", (state) => {
			state.loading = true;
		})
		.addCase("GET_ACTIVE_USERS_SUCCESS", (state, action) => {
			state.loading = false;
			state.activeUsers = action.payload;
		})
		.addCase("GET_ACTIVE_USERS_FAILURE", (state) => {
			state.loading = false;
		})
		.addCase("MAIL_REQUEST", (state) => {
			state.loading = true;
		})
		.addCase("MAIL_SUCCESS", (state) => {
			state.loading = false;
			state.message = "Mail Sent Successfully";
		})
		.addCase("MAIL_FAILURE", (state) => {
			state.loading = false;
		})
		.addCase("GENERATE_REFERAL_CODE_REQUEST", (state) => {
			state.loading = true;
		})
		.addCase("GENERATE_REFERAL_CODE_SUCCESS", (state) => {
			state.loading = false;
		})
		.addCase("GENERATE_REFERAL_CODE_FAILURE", (state) => {
			state.loading = false;
		})
		.addCase("GENERATE_REFERAL_LINK_REQUEST", (state) => {
			state.loading = true;
		})
		.addCase("GENERATE_REFERAL_LINK_SUCCESS", (state) => {
			state.loading = false;
		})
		.addCase("GENERATE_REFERAL_LINK_FAILURE", (state) => {
			state.loading = false;
		})
		.addCase("SEND_REFERRAL_MAIL_REQUEST", (state) => {
			state.loading = true;
		})
		.addCase("SEND_REFERRAL_MAIL_SUCCESS", (state) => {
			state.loading = false;
			state.message = "Mail Sent";
		})
		.addCase("SEND_REFERRAL_MAIL_FAILURE", (state) => {
			state.loading = false;
		})
		.addCase("SEND_REGISTRATION_MAIL_REQUEST", (state) => {
			state.loading = true;
		})
		.addCase("SEND_REGISTRATION_MAIL_SUCCESS", (state) => {
			state.loading = false;
		})
		.addCase("SEND_REGISTRATION_MAIL_FAILURE", (state) => {
			state.loading = false;
		})
		.addCase("CLEAR_ERRORS", (state) => {
			state.error = null;
		})
		.addCase("CLEAR_MESSAGES", (state) => {
			state.message = null;
		});
});

export const updateReducer = createReducer(initialState, (builder) => {
	builder
		.addCase("UPDATE_PROFILE_REQUEST", (state) => {
			state.loading = true;
		})
		.addCase("UPDATE_PROFILE_SUCCESS", (state, action) => {
			state.loading = false;
			state.message = action.payload.message;
		})
		.addCase("UPDATE_PROFILE_FAILURE", (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})
		.addCase("CALCULATE_REFERRAL_REQUEST", (state) => {
			state.loading = true;
		})
		.addCase("CALCULATE_REFERRAL_SUCCESS", (state, action) => {
			state.loading = false;
			// state.message = action.payload.message;
			state.referralAmount = action.payload.referralAmount;
		})
		.addCase("CALCULATE_REFERRAL_FAILURE", (state) => {
			state.loading = false;
		})
		.addCase("CALCULATE_LEVEL_REQUEST", (state) => {
			state.loading = true;
		})
		.addCase("CALCULATE_LEVEL_SUCCESS", (state, action) => {
			state.loading = false;
			// state.message = action.payload.message;
			state.level = action.payload.level;
		})
		.addCase("CALCULATE_LEVEL_FAILURE", (state) => {
			state.loading = false;
		})
		.addCase("VERIFY_USER_REQUEST", (state) => {
			state.loading = true;
		})
		.addCase("VERIFY_USER_SUCCESS", (state, action) => {
			state.loading = false;
			state.message = action.payload.message;
			state.referralCode = action.payload.referralCode;
			state.userid = action.payload.userid;
		})
		.addCase("VERIFY_USER_FAILURE", (state, action) => {
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

export const treeReducer = createReducer(initialState, (builder) => {
	builder
		.addCase("GENERATE_TREE_REQUEST", (state) => {
			state.loading = true;
		})
		.addCase("GENERATE_TREE_SUCCESS", (state, action) => {
			state.loading = false;
			state.tree = action.payload.tree;
		})
		.addCase("GENERATE_TREE_FAILURE", (state) => {
			state.loading = false;
			state.tree = [];
		})
		.addCase("CLEAR_ERRORS", (state) => {
			state.error = null;
		})
		.addCase("CLEAR_MESSAGES", (state) => {
			state.message = null;
		});
});
