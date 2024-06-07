import signupImg from "../assets/sign-in.png";
import topCircle from "../assets/register-top.png";
import bottomCircle from "../assets/register-bottom.png";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/GBT.png";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/actions";
import { Loader, TextLoader } from "../components";
import { toast } from "react-toastify";
import { generateResetToken } from "../redux/actions/user.action";

function SignIn() {
	const dispatch = useDispatch();
	const { loading, user } = useSelector((state) => state.user);
	const [isChecked, setIsChecked] = useState(false);
	const navigate = useNavigate();

	const [loginDetails, setLoginDetails] = useState({
		email: "",
		password: "",
	});

	const onChangeHandler = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setLoginDetails({ ...loginDetails, [name]: value });
	};

	const forgotHandler = () => {
		if (!loginDetails.email) {
			toast.error("Please enter your email!");
			return;
		}
		dispatch(generateResetToken(loginDetails.email));
	};

	const loginHandler = (e) => {
		e.preventDefault();
		dispatch(userLogin(loginDetails));
	};

	const onChangeCheckbox = (event) => {
		setIsChecked({
			isChecked: event.target.checked,
		});
	};

	useEffect(() => {
		if (user) {
			if (user.plan == "free") {
				navigate("/payment");
			} else {
				navigate("/dashboard");
			}
		}
	}, [user]);

	return (
		<div className="signin">
			<main className="login-main">
				<section>
					<form>
						<img className="GBT-logo" src={logo} alt="hii" />
						<h2>Welcome Back!</h2>
						<p>Please login yourself</p>
						<div className="input-container">
							<input value={loginDetails.email} onChange={onChangeHandler} name="email" type="text" placeholder="Your Email" />
							<input onChange={onChangeHandler} value={loginDetails.password} name="password" type="password" placeholder="Password" />
						</div>
						<div className="action-container">
							<div className="remember-me">
								<input type="checkbox" checked={isChecked} name="lsRememberMe" onChange={onChangeCheckbox} />
								<label>Remember me</label>
							</div>
							<p style={{ cursor: "pointer" }} onClick={forgotHandler}>
								Forget Password?
							</p>
						</div>
						<button onClick={loginHandler} disabled={loading} className="submitBtn" type="submit">
							{loading ? <TextLoader /> : "Log In"}
						</button>
						<p className="account">
							Don&apos;t have an Account?{" "}
							<span>
								<Link to="/signup">Register</Link>
							</span>
						</p>
					</form>
					<div className="right-container">
						<img
							className="top-circle"
							src={topCircle}
							alt="top circle"
							style={{
								left: "102.5%",
								top: "2.5%",
								transform: "translateX(-100%) rotate(-270deg)",
							}}
						/>
						<img src={signupImg} alt="sign up image" />
						<img
							className="bottom-circle"
							src={bottomCircle}
							alt="bottom circle"
							style={{
								right: "100%",
								bottom: "0%",
								transform: "translateX(100%) rotate(-270deg)",
							}}
						/>
					</div>
				</section>
			</main>
		</div>
	);
}

export default SignIn;
