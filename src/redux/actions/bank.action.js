import axios from "axios";
import Cookies from "js-cookie";

// const URI = "https://gbt-trust-backend.onrender.com/api/v1/user";
const URI = import.meta.env.VITE_API_ENDPOINT;

export const getBankDetails = (id) => async (dispatch) => {
	try {
		dispatch({
			type: "GET_BANKDETAILS_REQUEST",
		});

		const token = Cookies.get("token"); // Get the token from the cookie
		// eslint-disable-next-line no-unused-vars
		const config = {
			headers: {
				Authorization: `Bearer ${token}`, // Include the token in the Authorization header
			},
		};
		const { data } = await axios.get(`${URI}/get/bankdetails?userId=${id}`, config);
		const payload = {
			bank: data.data,
			message: data.message,
		};

		dispatch({
			type: "GET_BANKDETAILS_SUCCESS",
			payload,
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: "GET_BANKDETAILS_FAILURE",
			payload: error.message,
		});
	}
};

// ?? transfer to bank
export const transferRequest = (payoutPayload) => async (dispatch) => {
	try {
		dispatch({
			type: "REQUEST_WITHDRAWAL_REQUEST",
		});

		const token = Cookies.get("token"); // Get the token from the cookie
		// eslint-disable-next-line no-unused-vars
		const config = {
			headers: {
				Authorization: `Bearer ${token}`, // Include the token in the Authorization header
			},
		};
		const { data } = await axios.post(`${URI}/request/withdrawal`, payoutPayload, config);
		const payload = {
			message: data.message,
		};

		dispatch({
			type: "REQUEST_WITHDRAWAL_SUCCESS",
			payload,
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: "REQUEST_WITHDRAWAL_FAILURE",
			payload: error.message,
		});
	}
};

export const transferAwardRequest = (payoutPayload) => async (dispatch) => {
	try {
		dispatch({
			type: "REQUEST_WITHDRAWAL_REQUEST",
		});

		const token = Cookies.get("token"); // Get the token from the cookie
		// eslint-disable-next-line no-unused-vars
		const config = {
			headers: {
				Authorization: `Bearer ${token}`, // Include the token in the Authorization header
			},
		};
		const { data } = await axios.post(`${URI}/request/award/withdrawal`, payoutPayload, config);
		const payload = {
			message: data.message,
		};

		dispatch({
			type: "REQUEST_WITHDRAWAL_SUCCESS",
			payload,
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: "REQUEST_WITHDRAWAL_FAILURE",
			payload: error.message,
		});
	}
};
