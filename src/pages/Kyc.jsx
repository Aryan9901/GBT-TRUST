/* eslint-disable react/prop-types */
import { AdminSidebar, Bar, TableBody, Table, TableContainer, TableHeaders, TableHeading, KYCRow, Loader } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addReferral, getAllUsers, verifyUser } from "../redux/actions/index";
import { toast } from "react-toastify";
import { MdRefresh } from "react-icons/md";

const kycSortOptions = [
	{ value: "", label: "Sort By" },
	{ value: "Pending", label: "Pending" },
	{ value: "Approved", label: "Approved" },
];

// Your existing components and imports...

const kycHeaders = ["User Id", "First Name", "Last Name", "Contact Number", "Email Id", "Verification Status"];

function Kyc() {
	const { message: usermsg, error: usererr, users, loading: userLoading } = useSelector((state) => state.user);
	const { message, error, loading, referralCode, userid } = useSelector((state) => state.update);
	const [usersdata, setUsersdata] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedSortOption] = useState(kycSortOptions[0]); // Default to first sorting option
	const [todaysJoining, setTodaysJoining] = useState([]);
	const [selectedUser, setSelectedUser] = useState();
	const dispatch = useDispatch();

	// Filter function to filter usersdata based on search query
	const filteredData = usersdata.filter((user) => {
		const searchTerm = searchQuery.toLowerCase();
		return user.data.some((item) => item.toLowerCase().includes(searchTerm));
	});

	// Sorting function based on selected sort option
	const sortedData = filteredData.sort((a, b) => {
		if (selectedSortOption.value === "Pending") {
			return a.status.localeCompare(b.status);
		} else if (selectedSortOption.value === "Approved") {
			return b.status.localeCompare(a.status);
		} else {
			return 0;
		}
	});

	const userVerifyHandler = (userId, verify) => {
		if (userId) {
			dispatch(verifyUser(userId, verify));
			dispatch(getAllUsers());
		} else {
			toast.error("User Is not Selected");
		}
	};

	const onSelectUser = (user) => {
		if (user.user.verified === "rejected") {
			toast.info("user is rejected");
			return;
		}
		// console.log(user.user.plan);
		setSelectedUser(user.user);
	};

	const refreshPage = () => {
		window.location.reload();
	};

	useEffect(() => {
		if (referralCode && userid) {
			// alert(referralCode);
			dispatch(addReferral(referralCode, userid));
		}
	}, [dispatch, referralCode, userid]);

	useEffect(() => {
		if (users && users.length > 0) {
			const processedUsersData = users
				.filter((user) => user.role === "user")
				.map((user) => ({
					data: [`ID-${user.userId}`, user.firstName, user.lastName, user.contact, user.email],
					status: user.verified === "approved" ? "Approved" : user.verified === "pending" ? "Pending" : "Rejected",
					_id: user.userId, // Assuming user ID can be used as _id,
					user: user,
				}))
				.reverse();

			const remianingUser = processedUsersData.filter((user) => user.status !== "Approved");

			setUsersdata(remianingUser); // Update state with the processed user data
		}
	}, [users, loading, userLoading]);

	useEffect(() => {
		if (users) {
			// Get today's date
			const today = new Date();
			today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for accurate comparison

			// Filter users whose createdAt date is today
			const todaysJoiningUsers = users.filter((user) => {
				// Convert user's createdAt date to a Date object
				const userCreatedAt = new Date(user.createdAt);
				// Set hours, minutes, seconds, and milliseconds to 0 for accurate comparison
				userCreatedAt.setHours(0, 0, 0, 0);
				// Compare with today's date
				return userCreatedAt.getTime() <= today.getTime();
			});

			// Map filtered users to the desired format
			const data = todaysJoiningUsers.map((user) => {
				return {
					avatar: user?.avatar,
					role: user.role,
					aadhar: user?.aadharCard,
					id: user._id,
					verified: user.verified,
					status: user?.plan,
				};
			});

			const filterUserData = data.filter((user) => user.role !== "admin");
			const verifiedUserData = filterUserData.filter((user) => user.verified !== "approved");
			// Set the state with filtered users
			setTodaysJoining(verifiedUserData);
		}
	}, [users, loading, userLoading]);

	useEffect(() => {
		if (message) {
			toast.success(message);
			setSelectedUser(null);
			dispatch({ type: "CLEAR_MESSAGES" });
		}
		if (usermsg) {
			toast.success(usermsg);
			dispatch({ type: "CLEAR_MESSAGES" });
		}
		if (usererr) {
			toast.error(usererr);
			dispatch({ type: "CLEAR_ERRORS" });
		}
		if (error) {
			toast.error(error);
			dispatch({ type: "CLEAR_ERRORS" });
		}
	}, [message, error, dispatch, usermsg, usererr]);

	if (loading) {
		return <Loader />;
	}
	if (userLoading) {
		return <Loader />;
	}

	return (
		<div className="admin-container">
			<AdminSidebar />
			<main className="kycPage">
				<Bar heading="KYC" />
				<section className="kyc">
					{selectedUser && (
						<section className="kycregistration">
							<div className="heading">
								<p>Registration Documents</p>
								<p style={{ fontSize: "1rem", fontFamily: "poppins", fontWeight: 300 }}>Phone:- +91-{selectedUser?.contact}</p>
								<p style={{ fontSize: "1rem", fontFamily: "poppins", fontWeight: 300 }}>Email:- {selectedUser?.email}</p>
							</div>

							<div className="body">
								<div className="content">
									{selectedUser?.plan === "premium" ? (
										<div className="fees">
											<h1>₹</h1>
											<p>Registration Fees : 580.00 Rs</p>
										</div>
									) : (
										<div className="fees" style={{ color: "red" }}>
											<h1>₹ 580.00</h1>
											<p>Payment not done yet</p>
										</div>
									)}

									<div className="photo">
										<p>Photo Identification</p>
										<img className="kyc-image" src={selectedUser?.avatar} alt={selectedUser?.firstName} />
									</div>

									<div className="aadhar">
										<p>Aadhar Card</p>
										<img className="kyc-image" src={selectedUser?.aadharCard} alt={selectedUser?.firstName} />
									</div>
								</div>

								<div className="footer">
									{/* <button
										onClick={() => {
											userVerifyHandler(selectedUser._id, false);
										}}
									>
										Decline
									</button> */}
									<button
										onClick={() => {
											userVerifyHandler(selectedUser._id, true);
										}}
									>
										Accept
									</button>
								</div>
							</div>
						</section>
					)}
					<TableContainer className="kycTable">
						<TableHeading>
							<p>Registration List</p>
							<MdRefresh
								style={{ marginLeft: "auto", marginRight: "1rem", color: "#fcfcfc", fontSize: "1.7rem", cursor: "pointer" }}
								onClick={refreshPage}
							/>
							<input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
						</TableHeading>
						<Table>
							<TableHeaders
								style={{
									gridTemplateColumns: `repeat(${kycHeaders.length},1fr)`,
								}}
								headers={kycHeaders}
							/>
							<TableBody onClick={onSelectUser} TableRow={KYCRow} data={sortedData} />
						</Table>
					</TableContainer>
				</section>
			</main>
		</div>
	);
}

export default Kyc;

export const CardWidget = ({ heading, Icon, Action, value, style }) => {
	return (
		<article className="pinCard" style={style}>
			<Icon />
			<div>
				<h3>{heading}</h3>
				{value && <p>{value}</p>}
			</div>
			<Action />
		</article>
	);
};
