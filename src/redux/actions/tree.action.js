import axios from "axios";
import Cookies from "js-cookie";

// const URI = "https://gbt-trust-backend.onrender.com/api/v1/user";
const URI = import.meta.env.VITE_API_ENDPOINT;

export const generateTree = (id) => async (dispatch) => {
	try {
		dispatch({
			type: "GENERATE_TREE_REQUEST",
		});

		const token = Cookies.get("token");
		const config = {
			headers: {
				Authorization: `Bearer ${token}`, // Include the token in the Authorization header
			},
		};

		const { data } = await axios.post(`${URI}/generate/tree?userId=${id}`, {}, config);
		console.log(data);
		const payload = {
			tree: data.data,
			message: data.message,
		};

		dispatch({
			type: "GENERATE_TREE_SUCCESS",
			payload,
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: "GENERATE_TREE_FAILURE",
			payload: error.message,
		});
	}
};
