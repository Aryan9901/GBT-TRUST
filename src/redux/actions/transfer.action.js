import axios from "axios";
import Cookies from "js-cookie";

// const URI = "https://gbt-trust-backend.onrender.com/api/v1/user";
const URI = import.meta.env.VITE_API_ENDPOINT;

export const getAllTransferRequest = () => async (dispatch) => {
	try {
		dispatch({
			type: "GET_ALL_TRANSFER_REQUEST_REQUEST",
		});

		const token = Cookies.get("token"); // Get the token from the cookie
		// eslint-disable-next-line no-unused-vars
		const config = {
			headers: {
				Authorization: `Bearer ${token}`, // Include the token in the Authorization header
			},
		};
		const { data } = await axios.get(`${URI}/get/withdrawal/requests`, config);
		const payload = {
			transfers: data.data,
			message: data.message,
		};

		dispatch({
			type: "GET_ALL_TRANSFER_REQUEST_SUCCESS",
			payload,
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: "GET_ALL_TRANSFER_REQUEST_FAILURE",
			payload: error.message,
		});
	}
};

export const getTransferRequestById = () => async (dispatch) => {
	try {
		dispatch({
			type: "GET_TRANSFER_REQUEST_BY_ID_REQUEST",
		});

		const token = Cookies.get("token"); // Get the token from the cookie
		// eslint-disable-next-line no-unused-vars
		const config = {
			headers: {
				Authorization: `Bearer ${token}`, // Include the token in the Authorization header
			},
		};
		const { data } = await axios.get(`${URI}/get/withdrawal/request`, config);
		const payload = {
			transfers: data.data,
			message: data.message,
		};

		dispatch({
			type: "GET_TRANSFER_REQUEST_BY_ID_SUCCESS",
			payload,
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: "GET_TRANSFER_REQUEST_BY_ID_FAILURE",
			payload: error.message,
		});
	}
};

export const getSingleTransfer = (id) => async (dispatch) => {
	try {
		dispatch({
			type: "GET_SINGLE_TRANSFER_REQUEST",
		});

		const token = Cookies.get("token"); // Get the token from the cookie
		// eslint-disable-next-line no-unused-vars
		const config = {
			headers: {
				Authorization: `Bearer ${token}`, // Include the token in the Authorization header
			},
		};
		const { data } = await axios.get(`${URI}/get/withdrawal/request/single?id=${id}`, config);
		const payload = {
			transfer: data.data,
			message: data.message,
		};

		dispatch({
			type: "GET_SINGLE_TRANSFER_SUCCESS",
			payload,
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: "GET_SINGLE_TRANSFER_FAILURE",
			payload: error.message,
		});
	}
};

export const processTransferRequest = (action) => async (dispatch) => {
	try {
		dispatch({
			type: "PROCESS_TRANSFER_REQUEST_REQUEST",
		});

		const token = Cookies.get("token"); // Get the token from the cookie
		// eslint-disable-next-line no-unused-vars
		const config = {
			headers: {
				Authorization: `Bearer ${token}`, // Include the token in the Authorization header
			},
		};
		const { data } = await axios.post(`${URI}/process/request`, action, config);

		const payload = {
			message: data.message,
		};

		dispatch({
			type: "PROCESS_TRANSFER_REQUEST_SUCCESS",
			payload,
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: "PROCESS_TRANSFER_REQUEST_FAILURE",
			payload: error.message,
		});
	}
};

export const processAwardRequest = (action) => async (dispatch) => {
	try {
		dispatch({
			type: "PROCESS_TRANSFER_REQUEST_REQUEST",
		});

		const token = Cookies.get("token"); // Get the token from the cookie
		// eslint-disable-next-line no-unused-vars
		const config = {
			headers: {
				Authorization: `Bearer ${token}`, // Include the token in the Authorization header
			},
		};
		const { data } = await axios.post(`${URI}/process/award/request`, action, config);

		const payload = {
			message: data.message,
		};

		dispatch({
			type: "PROCESS_TRANSFER_REQUEST_SUCCESS",
			payload,
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: "PROCESS_TRANSFER_REQUEST_FAILURE",
			payload: error.message,
		});
	}
};
