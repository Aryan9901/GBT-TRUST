import axios from "axios";
import Cookies from "js-cookie";

// const URI = "https://gbt-trust-backend.onrender.com/api/v1/user";

const URI = import.meta.env.VITE_API_ENDPOINT;

export const requestEvent = (event) => async (dispatch) => {
	try {
		dispatch({
			type: "REQUEST_EVENT_REQUEST",
		});

		const token = Cookies.get("token"); // Get the token from the cookie
		// eslint-disable-next-line no-unused-vars
		const config = {
			headers: {
				Authorization: `Bearer ${token}`, // Include the token in the Authorization header
			},
		};

		const { data } = await axios.post(`${URI}/request/event`, event, config);
		const payload = {
			event: data.data,
			message: data.message,
		};

		dispatch({
			type: "REQUEST_EVENT_SUCCESS",
			payload,
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: "REQUEST_EVENT_FAILURE",
			payload: error.message,
		});
	}
};

export const getAllEvents = () => async (dispatch) => {
	try {
		dispatch({
			type: "GET_ALL_EVENTS_REQUEST",
		});

		const token = Cookies.get("token"); // Get the token from the cookie
		// eslint-disable-next-line no-unused-vars
		const config = {
			headers: {
				Authorization: `Bearer ${token}`, // Include the token in the Authorization header
			},
		};

		const { data } = await axios.get(`${URI}/get/events`, config);
		const payload = {
			events: data.data,
			message: data.message,
		};

		dispatch({
			type: "GET_ALL_EVENTS_SUCCESS",
			payload,
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: "GET_ALL_EVENTS_FAILURE",
			payload: error.message,
		});
	}
};

export const acceptEvent = (id) => async (dispatch) => {
	try {
		dispatch({
			type: "ACCEPT_EVENT_REQUEST",
		});

		const token = Cookies.get("token"); // Get the token from the cookie
		// eslint-disable-next-line no-unused-vars
		const config = {
			headers: {
				Authorization: `Bearer ${token}`, // Include the token in the Authorization header
			},
		};

		const { data } = await axios.patch(`${URI}/update/event/status?id=${id}`, {}, config);
		const payload = {
			message: data.message,
		};

		dispatch({
			type: "ACCEPT_EVENT_SUCCESS",
			payload,
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: "ACCEPT_EVENT_FAILURE",
			payload: error.message,
		});
	}
};
