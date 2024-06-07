import useRazorpay from "react-razorpay";
import emailjs from "emailjs-com";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addReferral } from "../redux/actions";
import { loadUser } from "../redux/actions";
import { updateTrack } from "../redux/actions/user.action";

const Payment = () => {
	const [Razorpay] = useRazorpay();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.user);

	const [plan, setPlan] = useState("personal");

	useEffect(() => {
		dispatch(loadUser());
	}, []);

	if (user?.role === "admin") {
		<Navigate to="/dashboard" />;
	}

	const paymentHandler = async () => {
		const orderData = {
			amount: 580 * 100, // Amount in paise (100 paise = 1 INR)
			currency: "INR",
			receipt: "upgrade_order_receipt_1",
		};
		try {
			const token = Cookies.get("token"); // Get the token from the cookie
			// eslint-disable-next-line no-unused-vars
			const config = {
				headers: {
					Authorization: `Bearer ${token}`, // Include the token in the Authorization header
				},
			};
			const response = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/rz/create-order`, orderData, config);

			const { order_id, razorpay_key } = response.data;

			const options = {
				key: razorpay_key, // Your Razorpay Key ID
				amount: orderData.amount,
				currency: orderData.currency,
				name: "Ganpati Balaji Trust",
				description: "Registration",
				order_id: order_id,
				handler: async function (response) {
					// Handle the success callback from Razorpay
					const paymentData = {
						order_id: order_id,
						payment_id: response.razorpay_payment_id,
					};
					// Send the payment data to your server for verification and processing
					const token = Cookies.get("token"); // Get the token from the cookie
					// eslint-disable-next-line no-unused-vars
					const config = {
						headers: {
							Authorization: `Bearer ${token}`, // Include the token in the Authorization header
						},
					};
					// eslint-disable-next-line no-unused-vars
					const data = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/rz/payment-verify`, paymentData, config);
					// console.log(data);
					setPlan("premium");
					axios
						.post(
							`${import.meta.env.VITE_API_ENDPOINT}/update-plan`,
							{
								plan: "premium",
							},
							config
						)
						.then((res) => {
							console.log(res);
							toast.success("payment done");
							dispatch(updateTrack(user?.track?.code));
							emailjs.send("gbt", "template_wsli5u9", { email_to: user.email, name_to: user.name }, "P7F3b84IHMAK1v72P").then(
								(result) => {
									// alert("success");
									console.log(result.text);
									navigate("/dashboard");
								},
								(error) => {
									console.log(error.text);
									// alert("failure");
								}
							);
							navigate("/dashboard");
						});
					// Display a success message to the user
				},
				prefill: {
					name: user.firstName,
					email: user.email,
				},
				notes: {
					plan: "Upgraded Plan", // Add any additional information as needed
				},
				theme: {
					color: "#F37254", // Customize the color as needed
				},
			};
			const rzp = new Razorpay(options);
			rzp.open();
		} catch (error) {
			console.error("Error creating Razorpay order:", error);
			toast.error("payment not done done");
		}
	};

	return (
		<section className="payment">
			<h1>Welcome to GBT Family!!</h1>
			<h2>To start your GBT journey kindly payment through the given link below .</h2>
			<button onClick={paymentHandler} className="submitBtn" type="submit">
				Pay ₹ 580 Now
			</button>
		</section>
	);
};

export default Payment;
