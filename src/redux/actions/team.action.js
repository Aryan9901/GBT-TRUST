import axios from "axios";
import Cookies from "js-cookie";

// const URI = "https://gbt-trust-backend.onrender.com/api/v1/user";

const URI = import.meta.env.VITE_API_ENDPOINT;

export const getTeam = (id) => async (dispatch) => {
	try {
		dispatch({
			type: "GET_TEAM_REQUEST",
		});

		const token = Cookies.get("token"); // Get the token from the cookie
		// eslint-disable-next-line no-unused-vars
		const config = {
			headers: {
				Authorization: `Bearer ${token}`, // Include the token in the Authorization header
			},
		};

		let apidata;
		if (id) {
			const { data } = await axios.get(`${URI}/get/team?id=${id}`, config);
			apidata = data;
		} else {
			const { data } = await axios.get(`${URI}/get/team`, config);
			apidata = data;
		}

		const payload = {
			teams: apidata.data,
			message: apidata.message,
		};

		dispatch({
			type: "GET_TEAM_SUCCESS",
			payload,
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: "GET_TEAM_FAILURE",
			payload: error.message,
		});
	}
};
