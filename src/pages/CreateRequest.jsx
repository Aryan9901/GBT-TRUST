import { useEffect, useState } from "react";
import { Bar, AdminSidebar, TextLoader, RequestRow, Table, TableBody, TableContainer, TableHeaders, TableHeading } from "../components";
import Select, { components } from "react-select";
import { toast } from "react-toastify";

import { IoIosArrowDown } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents, requestEvent, getBankDetails } from "../redux/actions/index";

const vehicleHeaders = ["Request Date", "Event Name", "Budget", "Status"];

const analyticsFilterOptions = [
	{ value: "", label: "Select Account Type" },
	{ value: "current", label: "current" },
	{ value: "saving", label: "saving" },
];

const customStyles = {
	control: (provided) => ({
		...provided,
		// padding: "0.3rem 0.6rem",
		cursor: "pointer",
		backgroundColor: "#d5d3d4",
		transition: "all 0.3s ease-in-out",
		border: "1.5px solid #003D79",
		"&:hover, &:focus": {
			backgroundColor: "#fff",
			// padding: "0.2rem",
			color: "",
			border1: "1.5px solid #003D79",
		},
	}),
	singleValue: (provided) => ({
		...provided,
		padding: "0.2rem",
		borderRadius: "10px",
		fontSize: "1.1rem",
		color: "#000",
		transition: "all 0.3s ease-in-out",
		"&:hover, &:focus": {
			// padding: "0.3rem 0.6rem",
			color: "#003D79",
		},
	}),
	dropdownIndicator: (provided) => ({
		...provided,
		color: "#000",
		fontSize: "2rem",
		"&:hover, &:focus": {
			color: "#003D79",
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

const CreateRequest = ({ query, handleSearch }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleSearchClick = () => {
		navigate("/search");
	};
	const { message, error, events, loading } = useSelector((state) => state.event);
	const { user } = useSelector((state) => state.user);
	const { bankdetails } = useSelector((state) => state.bank);

	const [eventName, setEventName] = useState("");
	const [purpose, setPurpose] = useState("");
	const [budget, setBudget] = useState(0);
	const [peopleJoin, setPeopleJoin] = useState(0);
	const [eventDate, setEventDate] = useState(Date.now().toLocaleString());
	const [time, setTime] = useState("");
	const [duration, setDuration] = useState(0);
	const [ifsc, setIfsc] = useState("");
	const [accountNumber, setAccountNumber] = useState("");
	const [accountHolderName, setAccountHolderName] = useState("");
	const [emails, setEmails] = useState("");
	const [location, setLocation] = useState("");
	const [accountType, setAccountType] = useState(analyticsFilterOptions[2].value);

	const [eventdata, setEventdata] = useState([]);

	const submitHandler = (e) => {
		e.preventDefault();
		// 	eventName,
		// 	purpose,
		// 	budget,
		// 	peopleJoin,
		// 	eventDate,
		// 	time,
		// 	duration,
		// 	ifsc,
		// 	accountNumber,
		// 	accountHolderName,
		// 	accountType,
		// 	emails,
		// 	location,
		// };
		const newEvent = {
			eventName,
			eventPurpose: purpose,
			eventBudget: budget,
			peopleJoin,
			eventDate,
			eventTime: time,
			eventDuration: duration,
			guestEmails: emails,
			eventLocation: location,
			bankDetails: {
				ifsc,
				accountNumber,
				accountHolderName,
				accountType,
			},
		};
		dispatch(requestEvent(newEvent));
		dispatch(getAllEvents());
	};

	useEffect(() => {
		dispatch(getAllEvents());
	}, [dispatch]);

	useEffect(() => {
		if (user) {
			dispatch(getBankDetails(user._id));
		}
	}, [user]);

	useEffect(() => {
		if (bankdetails) {
			setIfsc(bankdetails.ifscCode);
			setAccountType(bankdetails.accountType);
			setAccountNumber(bankdetails.accountNumber);
			setAccountHolderName(bankdetails.accountHolderName);
		}
	}, [bankdetails]);

	useEffect(() => {
		if (events) {
			const data = events.map((event) => {
				// Convert eventDate to a readable format
				const readableDate = new Date(event.eventDate).toLocaleDateString();
				return {
					data: [readableDate, event.eventName, event.eventBudget],
					status: event.status,
					_id: event._id,
				};
			});
			setEventdata(data);
		}
	}, [events]);

	useEffect(() => {
		if (message) {
			toast.success(message);
			dispatch({ type: "CLEAR_MESSAGES" });
		}
		if (error) {
			toast.error(error);
			dispatch({ type: "CLEAR_ERRORS" });
		}
	}, [message, error, dispatch]);

	return (
		<>
			<div className="admin-container">
				<AdminSidebar />
				<main className="dashboard">
					<Bar heading="Request" />
					<section className="request">
						<div className="event">
							<form onSubmit={submitHandler}>
								<h1>Create an Event</h1>
								<div className="event-basic">
									<div className="left">
										<input
											onChange={(e) => setEventName(e.target.value)}
											type="text"
											name="name"
											id="name"
											placeholder="Event Name"
											required
										/>
										<input
											onChange={(e) => setBudget(e.target.value)}
											type="text"
											name="budget"
											id="budget"
											placeholder="Total Budget"
											required
										/>
										<input
											onChange={(e) => setPeopleJoin(e.target.value)}
											type="text"
											name="people_join"
											id="people_join"
											placeholder="People Join"
											required
										/>
									</div>
									<div className="right">
										<textarea
											onChange={(e) => setPurpose(e.target.value)}
											name="purpose"
											id="purpose"
											placeholder="Purpose of the Event"
											required
										></textarea>
									</div>
								</div>
								<div className="event-timings">
									<input
										type="date"
										name="date"
										id="date"
										onChange={(e) => setEventDate(e.target.value)}
										placeholder="enter date"
										required
									/>
									<input onChange={(e) => setTime(e.target.value)} type="time" name="time" id="time" placeholder="Time" />
									<input
										onChange={(e) => setDuration(e.target.value)}
										type="number"
										name="duration"
										id="duration"
										placeholder="Duration"
										required
									/>
								</div>
								<div className="event-otherinfo">
									<input
										onChange={(e) => setEmails(e.target.value)}
										type="text"
										name="emails"
										id="emails"
										placeholder="Guest Emails (Comma Separated)"
									/>
									<input
										onChange={(e) => setLocation(e.target.value)}
										type="text"
										name="location"
										id="location"
										placeholder="Add Location"
									/>
								</div>
								<div className="bank-details">
									<h3>Bank details</h3>
									<div className="details">
										<input
											onChange={(e) => setIfsc(e.target.value)}
											type="text"
											name="ifsc"
											value={ifsc}
											id="ifsc"
											placeholder="Bank IFSC Code"
										/>
										<input
											onChange={(e) => setAccountNumber(e.target.value)}
											type="text"
											value={accountNumber}
											name="ac"
											id="ac"
											placeholder="Account Number"
										/>
									</div>
									<div className="details">
										<input
											onChange={(e) => setAccountHolderName(e.target.value)}
											value={accountHolderName}
											type="text"
											name="ifsc"
											id="ifsc"
											placeholder="Account Holder Name"
										/>
										<Select
											className="filter"
											defaultValue={analyticsFilterOptions[0]}
											options={analyticsFilterOptions}
											components={{ DropdownIndicator }}
											styles={customStyles}
											onClick={(e) => setAccountType(e.target.value)}
										/>
									</div>
								</div>
								<button className="btn btn-primary" type="submit">
									{loading ? "Creating an event..." : "Create Event"}
								</button>
							</form>
						</div>
						<TableContainer className="request-table">
							<TableHeading>
								<p>Request History</p>
							</TableHeading>
							<Table>
								<TableHeaders
									style={{
										gridTemplateColumns: `repeat(${vehicleHeaders.length},1fr)`,
									}}
									headers={vehicleHeaders}
								/>
								{loading && <TextLoader />}
								{!loading && <TableBody TableRow={RequestRow} data={eventdata} />}
							</Table>
						</TableContainer>
					</section>
				</main>
			</div>
		</>
	);
};

export default CreateRequest;
