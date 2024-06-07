import { useState } from "react";
import logo from "../assets/GBT.png";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { resetPassword } from "../redux/actions/user.action";

const Forgot = () => {
	const [data, setData] = useState({
		password: "",
		cnfp: "",
	});
	const params = useParams();
	const navigate = useNavigate();

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		if (!data.password || !data.cnfp) {
			toast.error("all fields are required");
			return;
		}
		if (data.password !== data.cnfp) {
			toast.error("password and confirm password must be same");
			return;
		}

		dispatch(resetPassword(data.password, params.resetToken));
		navigate("/");
	};

	return (
		<div className="forgotPassword">
			<div>
				<img className="GBT-logo" src={logo} alt="hii" />
				<form onSubmit={submitHandler}>
					<h2>Forgot Password</h2>
					<div>
						<label htmlFor="password">Enter New Password</label>
						<input
							type="password"
							value={data.password}
							onChange={(e) => setData((curr) => ({ ...curr, [e.target.name]: e.target.value }))}
							name="password"
							id="password"
						/>
					</div>
					<div>
						<label htmlFor="cnfp">Confirm Password</label>
						<input
							type="password"
							onChange={(e) => setData((curr) => ({ ...curr, [e.target.name]: e.target.value }))}
							value={data.cnfp}
							name="cnfp"
							id="cnfp"
						/>
					</div>
					<button type="submit">Reset Password</button>
				</form>
			</div>
		</div>
	);
};

export default Forgot;
