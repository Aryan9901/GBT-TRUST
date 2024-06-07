import axios from "axios";
import Cookies from "js-cookie";

const URI = import.meta.env.VITE_API_ENDPOINT;

export const getAllStatements = () => async (dispatch) => {
	try {
		dispatch({
			type: "GET_STATEMENTS_REQUEST",
		});

		const token = Cookies.get("token"); // Get the token from the cookie
		// eslint-disable-next-line no-unused-vars
		const config = {
			headers: {
				Authorization: `Bearer ${token}`, // Include the token in the Authorization header
			},
		};

		const { data } = await axios.get(`${URI}/get/statements`, config);
		const payload = data.data;

		dispatch({
			type: "GET_STATEMENTS_SUCCESS",
			payload,
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: "GET_STATEMENTS_FAILURE",
			payload: error.message,
		});
	}
};
