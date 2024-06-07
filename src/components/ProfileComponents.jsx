import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import Select, { components } from "react-select";
import { loadUser, updateProfile } from "../redux/actions/index";
import { useEffect, useState } from "react";
import Files from "react-files";
import { updateImages } from "../redux/actions/user.action";

const accountTypeOptions = [
	{ value: "", label: "Select Account Type" },
	{ value: "current", label: "Current Account" },
	{ value: "saving", label: "Saving Account" },
];

const genderTypeOptions = [
	{ value: "", label: "Select Gender Type" },
	{ value: "male", label: "Male" },
	{ value: "female", label: "Female" },
	{ value: "others", label: "Others" },
];

const customStyles = {
	control: (provided) => ({
		...provided,
		cursor: "pointer",
		backgroundColor: "#fff",
		transition: "all 0.3s ease-in-out",
		outline: "none",
		width: "100%",
		justifyContent: "flex-end",
		"&:hover, &:focus": {
			backgroundColor: "#fff",
			outline: "none",
			color: "rgb(2, 158, 157)",
		},
	}),
	singleValue: (provided) => ({
		...provided,
		padding: "0.2rem",
		borderRadius: "10px",
		fontSize: "1.1rem",
		opacity: "0.8",
		backgroundColor: "#fff",
		transition: "all 0.3s ease-in-out",
		"&:hover, &:focus": {
			color: "#ac3e2e",
		},
	}),
	dropdownIndicator: (provided) => ({
		...provided,
		color: "#000",
		fontSize: "2rem",
		"&:hover, &:focus": {
			color: "#ac3e2e",
		},
	}),
};

const DropdownIndicator = (props) => {
	return (
		<components.DropdownIndicator {...props}>
			<IoIosArrowDown />
		</components.DropdownIndicator>
	);
};

export function ProfileComponents() {
	const { user } = useSelector((state) => state.user);

	const [profile, setProfile] = useState({
		firstName: "",
		lastName: "",
		gender: "",
		dob: user?.dob ? user?.dob : "",
	});
	const dispatch = useDispatch();

	const onInputChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		setProfile((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
	};

	const onSelectChange = (selectedValue) => {
		setProfile((prev) => {
			return {
				...prev,
				gender: selectedValue.value,
			};
		});
	};

	const profileHandler = (e) => {
		e.preventDefault();
		dispatch(updateProfile(profile));
		dispatch(loadUser());
	};

	useEffect(() => {
		setProfile((prev) => ({
			...prev,
			firstName: user?.firstName,
			lastName: user?.lastName,
			gender: user?.gender,
			dob: user?.dob,
		}));
	}, [user]);

	return (
		<>
			<form onSubmit={profileHandler}>
				<div>
					<label htmlFor="firstName">First Name</label>
					<input type="text" id="firstName" placeholder="First Name" name="firstName" value={profile.firstName} onChange={onInputChange} />
				</div>

				<div>
					<label htmlFor="lastName">Last Name</label>
					<input type="text" id="lastName" placeholder="Last Name" name="lastName" value={profile.lastName} onChange={onInputChange} />
				</div>

				<div>
					<label htmlFor="gender">Gender {profile.gender}</label>
					<Select
						styles={customStyles}
						components={{ DropdownIndicator }}
						options={genderTypeOptions}
						defaultInputValue={user?.gender}
						value={profile?.gender === "female" ? { value: "female", label: "Female" } : { value: "male", label: "Male" }}
						onChange={onSelectChange}
						name="gender"
					/>
				</div>

				<div>
					<label htmlFor="dob">DOB</label>
					<input type="date" id="dob" name="dob" value={profile.dob} onChange={onInputChange} />
				</div>
				<button type="submit">Update</button>
			</form>
		</>
	);
}

export function BankComponent() {
	const [bank, setBank] = useState({
		accountNumber: "",
		ifscCode: "",
		accountType: "",
		accountHolderName: "",
	});
	const [selectedAccType, setSelectedAccType] = useState({ value: "", label: "Select Account Type" });
	const dispatch = useDispatch();

	const onInputChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		setBank((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
	};

	const onSelectChange = (selectedValue) => {
		setSelectedAccType(() => selectedValue);
		setBank((prev) => {
			return {
				...prev,
				accountType: selectedValue.value,
			};
		});
	};

	const bankHandler = (e) => {
		e.preventDefault();
		// console.log(bank);
		const data = {
			bankDetails: bank,
		};
		dispatch(updateProfile(data));
	};

	return (
		<>
			<form onSubmit={bankHandler}>
				<div>
					<label htmlFor="A/C Number">A/C No.</label>
					<input
						type="text"
						id="accountNumber"
						placeholder="A/C Number"
						value={bank.accountNumber}
						onChange={onInputChange}
						name="accountNumber"
					/>
				</div>

				<div>
					<label htmlFor="IFSC Code">IFSC Code</label>
					<input type="text" id="ifscCode" placeholder="IFSC CODE" value={bank.ifscCode} onChange={onInputChange} name="ifscCode" />
				</div>

				<div>
					<label htmlFor="A/C Holder Name">A/C Holer Name</label>
					<input
						type="text"
						id="accountHolderName"
						placeholder="Account Holder Name"
						value={bank.accountHolderName}
						onChange={onInputChange}
						name="accountHolderName"
					/>
				</div>

				<div>
					<label htmlFor="A/C Type">A/C Type</label>
					<Select
						styles={customStyles}
						components={{ DropdownIndicator }}
						options={accountTypeOptions}
						onChange={onSelectChange}
						value={selectedAccType}
					/>
				</div>
				<button type="submit">Update</button>
			</form>
		</>
	);
}

export function ContactComponent() {
	const { user } = useSelector((state) => state.user);
	const [contact, setContact] = useState({
		contact: "",
		whatsapp: "",
		facebook: "",
		linkedin: "",
	});
	const dispatch = useDispatch();

	const onInputChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		setContact((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
	};

	const contactHandler = (e) => {
		e.preventDefault();
		dispatch(updateProfile(contact));
	};
	return (
		<>
			<form onSubmit={contactHandler}>
				<div>
					<label htmlFor="Contact Number">Phone Number</label>
					<input type="number" id="phone" placeholder={user?.contact} name="contact" value={contact.contact} onChange={onInputChange} />
				</div>

				<div>
					<label htmlFor="Whatsapp Number">Whatsapp Number</label>
					<input
						type="number"
						id="whatsapp"
						name="whatsapp"
						value={contact.whatsapp}
						placeholder={user?.whatsapp}
						onChange={onInputChange}
					/>
				</div>

				<div>
					<label htmlFor="LinkedIn">LinkedIn</label>
					<input type="text" id="linkedin" name="linkedin" value={contact.linkedin} placeholder={user?.linkedin} onChange={onInputChange} />
				</div>

				<div>
					<label htmlFor="Facebook">Facebook</label>
					<input type="text" id="facebook" name="facebook" value={contact.facebook} placeholder={user?.facebook} onChange={onInputChange} />
				</div>
				<button type="submit">Update</button>
			</form>
		</>
	);
}

export function SettingsComponent() {
	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const [profile, setProfile] = useState({
		avatar: null,
		aadharCard: null,
		panCard: null,
	});

	const [fileNames, setFileNames] = useState({
		avatar: "",
		aadharCard: "",
		panCard: "",
	});

	const handleError = (error) => {
		console.error(`Error code ${error.code}: ${error.message}`);
	};

	const handleFileChange = (files, type) => {
		setFileNames((prev) => ({
			...prev,
			[type]: files[0]?.name || "",
		}));
		setProfile((prev) => ({
			...prev,
			[type]: files[0] || null,
		}));
	};

	const profileHandler = (e) => {
		e.preventDefault();
		const formData = new FormData();
		if (profile.avatar) formData.append("avatar", profile.avatar);
		if (profile.aadharCard) formData.append("aadhar", profile.aadharCard);
		if (profile.panCard) formData.append("pan", profile.panCard);

		console.log([...formData.entries()]); // Log formData entries for debugging

		dispatch(updateImages(formData));
		alert("Submitted");
	};

	const renderFileUploadSection = (label, type, fileName) => (
		<div className="single-file">
			<label htmlFor={`files-dropzone-${type}`}>{label}</label>
			<div className="file">
				<Files
					className="files-dropzone"
					onChange={(files) => handleFileChange(files, type)}
					onError={handleError}
					accepts={["image/png", "image/jpeg", "image/jpg"]}
					multiple={false} // Allow only single file upload
					maxFileSize={10000000}
					minFileSize={0}
					clickable
					name={type}
					id={`files-dropzone-${type}`}
				>
					Upload
				</Files>
			</div>
			{fileName ? <p>{fileName}</p> : null}
		</div>
	);

	useEffect(() => {
		// dispatch(loadUser());
	}, []);

	return (
		<form onSubmit={profileHandler}>
			{renderFileUploadSection("Upload Your Avatar", "avatar", fileNames.avatar)}
			{renderFileUploadSection("Upload Your Aadhar Card", "aadharCard", fileNames.aadharCard)}
			{renderFileUploadSection("Upload Your PAN Card", "panCard", fileNames.panCard)}
			<button type="submit">Update</button>
		</form>
	);
}
