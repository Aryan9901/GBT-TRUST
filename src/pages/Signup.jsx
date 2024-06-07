import signupImg from "../assets/signup.png";
import { useEffect, useState } from "react";
import topCircle from "../assets/register-top.png";
import bottomCircle from "../assets/register-bottom.png";
import { useLocation, useNavigate } from "react-router-dom";
import Files from "react-files";
import logo from "../assets/GBT.png";
import Select, { components } from "react-select";
import { IoIosArrowDown, IoIosClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { userSignup } from "../redux/actions/index";
import { TextLoader } from "../components";
import { toast } from "react-toastify";
function SignUp() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const code = searchParams.get("code");

	const [aadharFileName, setAadharFileName] = useState("");
	const [panFileName, setPanFileName] = useState("");
	const [avatarFileName, setAvatarFileName] = useState("");
	const { error, message, isAuthenticated, loading } = useSelector((state) => state.user);

	// const {  loading } = useSelector((state) => state.user);

	const [signupDetails, setSignupDetails] = useState({
		firstName: "",
		lastName: "",
		contact: "",
		email: "",
		password: "",
		city: "",
		state: "",
		postalCode: "",
		referralCode: "",
	});

	const [photo, setPhoto] = useState("");
	const [aadhar, setAadhar] = useState("");
	const [pan, setPan] = useState("");

	const DropdownIndicator = (props) => {
		return (
			<components.DropdownIndicator {...props}>
				<IoIosArrowDown />
			</components.DropdownIndicator>
		);
	};

	const customStyles = {
		control: (provided) => ({
			...provided,
			width: "100% !important",
			padding: "0rem 0.1rem",
			cursor: "pointer",
			backgroundColor: "#fcfcfc",
		}),
		singleValue: (provided) => ({
			...provided,
			padding: "0.3rem 0.6rem",
			marginRight: "1rem",
			borderRadius: "5px",
		}),
		dropdownIndicator: (provided) => ({
			...provided,
			color: "#111",
			"&:hover, &:focus": {
				color: "#111",
			},
		}),
	};

	const onSelectChange = (selectedValue) => {
		signupDetails.state = selectedValue.value;
	};

	const stateSortOptions = [
		{ value: "", label: "Select State" },
		{ value: "andrapradesh", label: "Andhra Pradesh" },
		{ value: "arunachalpradesh", label: "Arunachal Pradesh" },
		{ value: "assam", label: "Assam" },
		{ value: "bihar", label: "Bihar" },
		{ value: "chhattisgarh", label: "Chhattisgarh" },
		{ value: "goa", label: "Goa" },
		{ value: "gujarat", label: "Gujarat" },
		{ value: "haryana", label: "Haryana" },
		{ value: "himachalpradesh", label: "Himachal Pradesh" },
		{ value: "jharkhand", label: "Jharkhand" },
		{ value: "karnataka", label: "Karnataka" },
		{ value: "kerala", label: "Kerala" },
		{ value: "madhyapradesh", label: "Madhya Pradesh" },
		{ value: "maharashtra", label: "Maharashtra" },
		{ value: "manipur", label: "Manipur" },
		{ value: "meghalaya", label: "Meghalaya" },
		{ value: "mizoram", label: "Mizoram" },
		{ value: "nagaland", label: "Nagaland" },
		{ value: "odisha", label: "Odisha" },
		{ value: "punjab", label: "Punjab" },
		{ value: "rajasthan", label: "Rajasthan" },
		{ value: "sikkim", label: "Sikkim" },
		{ value: "tamilnadu", label: "Tamil Nadu" },
		{ value: "telangana", label: "Telangana" },
		{ value: "tripura", label: "Tripura" },
		{ value: "uttarpradesh", label: "Uttar Pradesh" },
		{ value: "uttarakhand", label: "Uttarakhand" },
		{ value: "westbengal", label: "West Bengal" },
		{ value: "andamannicobar", label: "Andaman and Nicobar Islands" },
		{ value: "chandigarh", label: "Chandigarh" },
		{
			value: "dadranagarhaveli",
			label: "Dadra and Nagar Haveli and Daman and Diu",
		},
		{ value: "lakshadweep", label: "Lakshadweep" },
		{ value: "delhi", label: "Delhi" },
		{ value: "puducherry", label: "Puducherry" },
		{ value: "ladakh", label: "Ladakh" },
		{ value: "lakshadweep", label: "Lakshadweep" },
	];

	const onChangeHandler = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setSignupDetails({ ...signupDetails, [name]: value });
	};

	const handleError = (error) => {
		console.log("error code " + error.code + ": " + error.message);
	};

	const signupFormSubmitHandler = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("avatar", photo);
		formData.append("aadhar", aadhar);
		formData.append("pan", pan);
		formData.append("firstName", signupDetails.firstName);
		formData.append("lastName", signupDetails.lastName);
		formData.append("contact", signupDetails.contact);
		formData.append("email", signupDetails.email);
		formData.append("password", signupDetails.password);
		formData.append("city", signupDetails.city);
		formData.append("state", signupDetails.state);
		formData.append("postalCode", signupDetails.postalCode);
		formData.append("referralCode", signupDetails.referralCode);

		// console.log(formData);
		dispatch(userSignup(formData));
	};

	const onAvatarChange = (files) => {
		setAvatarFileName(files[0].name);
		setPhoto(files[0]);
	};
	const onAadharChange = (files) => {
		setAadharFileName(files[0].name);
		setAadhar(files[0]);
	};
	const onPanChange = (files) => {
		setPanFileName(files[0].name);
		setPan(files[0]);
	};

	useEffect(() => {
		if (code) {
			setSignupDetails({
				...signupDetails,
				referralCode: code,
			});
		}
	}, [code]);

	// useEffect(() => {
	// 	if (message) {
	// 		dispatch({ type: "CLEAR_MESSAGES" });
	// 	}
	// 	if (error) {
	// 		toast.error(error);
	// 		dispatch({ type: "CLEAR_ERRORS" });
	// 	}
	// }, [message, error]);

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/");
		}
	}, [isAuthenticated]);

	return (
		<div className="signup">
			<main className="login-main">
				<section>
					<form onSubmit={signupFormSubmitHandler} encType="multipart/form-data" method="post">
						<img className="GBT-logo" src={logo} alt="hii" />
						<h2>Sign Up</h2>
						<p>Please Enter your details</p>
						<div className="input-container">
							<input
								value={signupDetails.firstName}
								onChange={onChangeHandler}
								name="firstName"
								type="text"
								placeholder="Your First Name"
							/>
							<input
								value={signupDetails.lastName}
								onChange={onChangeHandler}
								name="lastName"
								type="text"
								placeholder="Your Last Name"
							/>
							<input
								value={signupDetails.contact}
								onChange={onChangeHandler}
								name="contact"
								type="tel"
								placeholder="Your Mobile Number"
							/>
							<input
								value={signupDetails.referralCode}
								onChange={onChangeHandler}
								name="referralCode"
								type="tel"
								placeholder="Reffereal Code"
							/>

							<input onChange={onChangeHandler} value={signupDetails.city} name="city" type="city" placeholder="city" />
							<input
								onChange={onChangeHandler}
								value={signupDetails.postalCode}
								name="postalCode"
								type="postalCode"
								placeholder="PostalCode"
							/>
							<Select
								defaultValue={stateSortOptions[0]}
								options={stateSortOptions}
								components={{ DropdownIndicator }}
								styles={customStyles}
								onChange={onSelectChange}
								name="state"
							/>
							<input value={signupDetails.email} onChange={onChangeHandler} name="email" type="email" placeholder="Your Email" />
							<input onChange={onChangeHandler} value={signupDetails.password} name="password" type="password" placeholder="Password" />
						</div>
						<div className="files">
							<div className="single-file">
								<label htmlFor="files-dropzone">Upload Your Avatar</label>
								<div className="file">
									<Files
										className="files-dropzone"
										onChange={(files) => onAvatarChange(files)}
										onError={handleError}
										accepts={["image/png", "image/jpeg", "image/jpg"]}
										multiple
										maxFileSize={10000000}
										minFileSize={0}
										clickable
										name="avatar"
										id="avatar"
									>
										Upload
									</Files>
								</div>
								<p style={{ color: "green" }}>
									{avatarFileName}
									{avatarFileName && (
										<IoIosClose
											style={{ color: "red" }}
											onClick={() => {
												setPhoto(null);
												setAvatarFileName("");
											}}
										/>
									)}
								</p>
							</div>
							<div className="single-file">
								<label htmlFor="files-dropzone">Upload Your Aadhar</label>
								<div className="file">
									<Files
										className="files-dropzone"
										onChange={(files) => onAadharChange(files)}
										onError={handleError}
										accepts={["image/png", "image/jpeg", "image/jpg"]}
										multiple
										maxFileSize={10000000}
										minFileSize={0}
										clickable
										name="aadhar"
										id="aadhar"
									>
										Upload
									</Files>
								</div>
								<p style={{ color: "green" }}>
									{aadharFileName}
									{aadharFileName && (
										<IoIosClose
											style={{ color: "red" }}
											onClick={() => {
												setAadhar(null);
												setAadharFileName("");
											}}
										/>
									)}
								</p>
							</div>
							<div className="single-file">
								<label htmlFor="files-dropzone">Upload Your PAN</label>
								<div className="file">
									<Files
										className="files-dropzone"
										onChange={(files) => onPanChange(files)}
										onError={handleError}
										accepts={["image/png", "image/jpeg", "image/jpg"]}
										multiple
										maxFileSize={10000000}
										minFileSize={0}
										clickable
										name="pan"
										id="pan"
									>
										Upload
									</Files>
								</div>
								<p style={{ color: "green" }}>
									{panFileName}{" "}
									{panFileName && (
										<IoIosClose
											style={{ color: "red" }}
											onClick={() => {
												setPan(null);
												setPanFileName("");
											}}
										/>
									)}
								</p>
							</div>
						</div>
						<button className="submitBtn" disabled={loading} type="submit">
							{loading ? <TextLoader /> : "Register Now"}
						</button>
						<p className="account">
							Already have an Account? <span onClick={() => navigate("/")}>Log In</span>
						</p>
					</form>
					<div className="right-container">
						<img className="top-circle" src={topCircle} alt="top circle" />
						<img src={signupImg} alt="sign up image" />
						<img className="bottom-circle" src={bottomCircle} alt="bottom circle" />
					</div>
				</section>
			</main>
		</div>
	);
}

export default SignUp;
