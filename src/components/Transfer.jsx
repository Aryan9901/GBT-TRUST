/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FaSearch, FaSort } from "react-icons/fa";
import Select, { components } from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { transferRequest } from "../redux/actions/index";
import { toast } from "react-toastify";
import { transferAwardRequest } from "../redux/actions/bank.action";

const DropdownIndicator = (props) => {
	return (
		<components.DropdownIndicator {...props}>
			<FaSort />
		</components.DropdownIndicator>
	);
};

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

const accountTypeOptions = [
	{ value: "current", label: "Current" },
	{ value: "saving", label: "Savings" },
];

const Transfer = ({ isOpen, setIsOpen, availableAmount }) => {
	const { message, error } = useSelector((state) => state.bank);
	const { user } = useSelector((state) => state.user);

	const [bank, setBank] = useState({
		accountNumber: "",
		ifscCode: "",
		accountHolderName: "",
		amount: "",
		bankName: "",
		purpose: "",
		upi: "",
	});

	const dispatch = useDispatch();

	const onChangeHandler = (e) => {
		const { name, value } = e.target;
		if (name === "amount") {
			if (value > availableAmount - user?.amountWithdrawn && value > 0) {
				setBank({
					accountNumber: "",
					ifscCode: "",
					accountHolderName: "",
					amount: "",
					bankName: "",
					purpose: "",
				});
				return;
			}
		}
		setBank({ ...bank, [name]: value });
	};

	const onAccountTypeChange = (e) => {
		setBank({ ...bank, accountType: e.value });
	};

	const transferHandler = (e) => {
		e.preventDefault();
		if (bank) {
			dispatch(transferRequest(bank));
			setIsOpen(false);
		}
	};

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch({ type: "CLEAR_ERRORS" });
		}
		if (message) {
			toast.success(message);
			dispatch({ type: "CLEAR_MESSAGES" });
		}
	}, [message, error, dispatch]);

	return (
		<section className="wallet-transfer">
			{isOpen ? (
				<>
					<div className="heading">
						<p>Wallet Transfer Request</p>
					</div>
					<div className="body">
						<h3>Bank Details</h3>
						<form onSubmit={transferHandler}>
							<div>
								<input
									value={bank.accountNumber}
									onChange={onChangeHandler}
									name="accountNumber"
									type="text"
									placeholder="Account Number"
								/>
								<input onChange={onChangeHandler} value={bank.ifscCode} name="ifscCode" type="text" placeholder="Bank's IFSC Code" />
							</div>

							<div>
								<input
									onChange={onChangeHandler}
									value={bank.accountHolderName}
									name="accountHolderName"
									type="text"
									placeholder="Account Holder Name"
								/>
								<Select
									onChange={onAccountTypeChange}
									styles={customStyles}
									value={
										bank.accountType === "saving" ? { value: "saving", label: "Savings" } : { value: "current", label: "Current" }
									}
									name="accountType"
									components={{ DropdownIndicator }}
									options={accountTypeOptions}
									defaultValue={accountTypeOptions[0]}
								/>
							</div>
							<div>
								<div>
									<input onChange={onChangeHandler} value={bank.bankName} name="bankName" type="text" placeholder="Bank Name" />
									<input onChange={onChangeHandler} value={bank.amount} name="amount" type="text" placeholder="Request Amount" />
								</div>
								<input onChange={onChangeHandler} value={bank.purpose} name="purpose" type="text" placeholder="Message" />
							</div>
							<div>
								<div>
									<input onChange={onChangeHandler} value={bank.upi} name="upi" type="text" placeholder="Enter Upi Id" />
								</div>
							</div>
							<div className="transfer-button">
								<button type="submit">Transfer</button>
							</div>
						</form>
					</div>
				</>
			) : null}
		</section>
	);
};

export const AwardTransfer = ({ data }) => {
	const { message, error } = useSelector((state) => state.bank);

	const [bank, setBank] = useState({
		accountNumber: "",
		ifscCode: "",
		accountHolderName: "",
		amount: "",
		bankName: "",
		purpose: "",
		upi: "",
	});

	const dispatch = useDispatch();

	const onChangeHandler = (e) => {
		const { name, value } = e.target;
		if (name === "amount") {
			setBank({
				accountNumber: "",
				ifscCode: "",
				accountHolderName: "",
				address: "",
				amount: 0,
				bankName: "",
				purpose: "",
			});
			return;
		}
		setBank({ ...bank, [name]: value });
	};

	const onAccountTypeChange = (e) => {
		setBank({ ...bank, accountType: e.value });
	};

	const transferHandler = (e) => {
		e.preventDefault();
		if (bank) {
			console.log(bank);
			const bankdata = {
				accountNumber: bank.accountNumber,
				ifscCode: bank.ifscCode,
				accountHolderName: bank.accountHolderName,
				amount: data.cash,
				award: data.award,
				bankName: bank.bankName,
				address: bank.address,
				accountType: bank.accountType,
				purpose: bank.purpose,
				upi: bank.upi,
			};
			console.log(bankdata);
			dispatch(transferAwardRequest(bankdata));
		}
	};

	useEffect(() => {
		console.log(data);
	}, [data]);

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch({ type: "CLEAR_ERRORS" });
		}
		if (message) {
			toast.success(message);
			dispatch({ type: "CLEAR_MESSAGES" });
		}
	}, [message, error, dispatch]);

	return (
		<section className="wallet-transfer">
			<>
				<div className="heading">
					<p>Wallet Transfer Request</p>
				</div>
				<div className="body">
					<h3>Bank Details</h3>
					<form onSubmit={transferHandler}>
						<div>
							<input
								value={bank.accountNumber}
								onChange={onChangeHandler}
								name="accountNumber"
								type="text"
								placeholder="Account Number"
							/>
							<input onChange={onChangeHandler} value={bank.ifscCode} name="ifscCode" type="text" placeholder="Bank's IFSC Code" />
						</div>

						<div>
							<input
								onChange={onChangeHandler}
								value={bank.accountHolderName}
								name="accountHolderName"
								type="text"
								placeholder="Account Holder Name"
							/>
							<Select
								onChange={onAccountTypeChange}
								styles={customStyles}
								value={bank.accountType === "saving" ? { value: "saving", label: "Savings" } : { value: "current", label: "Current" }}
								name="accountType"
								components={{ DropdownIndicator }}
								options={accountTypeOptions}
								defaultValue={accountTypeOptions[0]}
							/>
						</div>
						<div>
							<div>
								<input onChange={onChangeHandler} value={bank.bankName} name="bankName" type="text" placeholder="Bank Name" />
								<input
									onChange={onChangeHandler}
									value={bank.address}
									name="address"
									type="text"
									placeholder="Your Address (with pincode)"
								/>
							</div>
							<input onChange={onChangeHandler} value={bank.purpose} name="purpose" type="text" placeholder="Message" />
						</div>
						<div>
							<div>
								<input onChange={onChangeHandler} value={bank.upi} name="upi" type="text" placeholder="Enter Upi Id" />
							</div>
						</div>
						<div className="transfer-button">
							<button type="submit">Transfer</button>
						</div>
					</form>
				</div>
			</>
		</section>
	);
};

export default Transfer;
