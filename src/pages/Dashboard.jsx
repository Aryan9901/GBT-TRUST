import { useEffect, useState } from "react";
import {
	AdminSidebar,
	Bar,
	TableContainer,
	Table,
	TableHeading,
	TableHeaders,
	TableBody,
	DashboardRow,
	ongoingEventRow,
	LevelRow,
	Loader,
} from "../components";
import { MdRefresh } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { generateReferal, generateReferalLink, getActiveUsers, getAllUsers, loadUser, getAllEvents } from "../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { calculateLevel, calculateReferral } from "../redux/actions/user.action";
import { ConstantRow } from "../components/TableHOC";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LevelHeaders = ["Sl no", "User Id", "Name", "Contact", "Email id", "Joining Date", "Status"];
const LevelDummyHeaders = ["Level", "Pair", "Commision", "Rank", "Reward"];

const levelData = [
	{
		data: ["You", "580", "Joining", "JOINING", "Towel"],
		cash: 0,
		award: "Towel",
		_id: "Level-101",
	},
	{
		data: ["Level 1", "1x2x580", "300", "JOINING", "-----------"],
		cash: 0,
		award: "",
		_id: "Level-101",
	},
	{
		data: ["Level 2", "300X2X2=4X580", "300", "JOINING", "-----------"],
		cash: 0,
		award: "",
		_id: "Level-101",
	},
	{
		data: ["Level 3", "300X4X2=8X580", "300", "JOINING", "-----------"],
		cash: 0,
		award: "",
		_id: "Level-101",
	},
	{
		data: ["Level 4", "300X8X2=16X580", "300", "JOINING", "-----------"],
		cash: 0,
		award: "",
		_id: "Level-101",
	},
	{
		data: ["Level 5", "300X16X2=32X580", "300", "JOINING", "-----------"],
		cash: 0,
		award: "",
		_id: "Level-101",
	},
	{
		data: ["Level 7", "300X32X2=64X580", "300", "JOINING", "-----------"],
		cash: 0,
		award: "",
		_id: "Level-101",
	},
	{
		data: ["Level 8", "128X2=256X580", "300", "JOINING", "-----------"],
		cash: 0,
		award: "",
		_id: "Level-101",
	},
	{
		data: ["Level 9", "256X2=512X580", "300", "JOINING", "-----------"],
		cash: 0,
		award: "",
		_id: "Level-101",
	},
	{
		data: ["Level 10", "512X2=1024X580", "300", "SILVER", "1000 CASH+LEATHER BAG"],
		cash: 1000,
		award: "Leather Bag",
		_id: "Level-101",
	},
	{
		data: ["Level 11", "300X1024=2043", "300", "GOLD", "2000 CASH+BOROSIL DINNER SET"],
		cash: 2000,
		award: "BOROSIL DINNER SET",
		_id: "Level-101",
	},
	{
		data: ["Level 12", "300X2048X2=4096", "300", "STARGOLD", "3000 CASH+ BANARASI SAREE"],
		cash: 3000,
		award: "BANARASI SAREE",
		_id: "Level-101",
	},
	{
		data: ["Level 13", "4096X2=8192X580", "300", "PLATINUM", "4000 CASH+ TABLET"],
		cash: 4000,
		award: "TABLET",
		_id: "Level-101",
	},
	{
		data: ["Level 14", "300X8192X2=16384X580", "300", "EMRALD", "8000 CASH+HONDA BIKE"],
		cash: 8000,
		award: "HONDA BIKE",
		_id: "Level-101",
	},
	{
		data: ["Level 15", "300x16384x2=32768x580", "300", "RUBI", "40000 CASH+ BULLET BIKE"],
		cash: 40000,
		award: "BULLET BIKE",
		_id: "Level-101",
	},
	{
		data: ["Level 16", "300x32768x2=65536x580", "300", "DAIMOND", "80000 CASH+ FOUR WHEELER (5 LAKH)"],
		cash: 80000,
		award: "FOUR WHEELER CAR (5 LAKH)",
		_id: "Level-101",
	},
	{
		data: ["Level 17", "300x65536X2=131072X580", "300", "DOUBLE DIAMOND", "4 LAKH CASH+ TATA FOUR WHEELER CAR( 10 LAKH)"],
		cash: 400000,
		award: "TATA FOUR WHEELER CAR (10 LAKH)",
		_id: "Level-101",
	},
	{
		data: ["Level 18", "300X131072X2=262,144X580", "300", "STAR DIAMOND", "10 LAKH CASH+BUNGALOW (15 LAKH)+ WITH FAMILY WORLD TOUR"],
		cash: 1000000,
		award: "BUNGALOW (15 LAKH)+ WITH FAMILY WORLD WORLD WORLD",
		_id: "Level-101",
	},
	{
		data: ["Level 19", "300X262144X2=524288X580", "300", "CROWN", "20 LAKH CASH+ FOUR WHEELER FORTUNER+ WORLD TOUR WITH FAMILY"],
		cash: 2000000,
		award: "FORTUNER + WORLD TOUR WITH FAMILY",
		_id: "Level-101",
	},
	{
		data: ["Level 20", "300X524288X2=1047576X580", "300", "STAR CROWN", "30 LAKH CASH+SKODA CAR + WORLD TOUR WITH FAMILY"],
		cash: 3000000,
		award: "SKODA CAR + WORLD TOUR WITH FAMILY",
		_id: "Level-101",
	},
	{
		data: ["Level 21", "300X1047576X2=2095152X580", "300", "DOUBLE CROWN", "40 LAKH CASH+BMW CAR+ WORLD TOUR WITH FAMILY"],
		cash: 4000000,
		award: "BMW CAR+ WORLD TOUR WITH FAMILY",
		_id: "Level-101",
	},
];

const levelsHeaders = [
	{
		Header: "Level",
		accessor: "level",
	},
	{
		Header: "Pair",
		accessor: "pair",
	},
	{
		Header: "Commission",
		accessor: "commission",
	},
	{
		Header: "Rank",
		accessor: "rank",
	},
	{
		Header: "Reward",
		accessor: "reward",
	},
];

const ongoingEventsHeaders = ["Event Manager", "Date and Time", "Agenda", "Guest Number", "Location"];

const bonusMap = {
	0: "0",
	1: "0",
	2: "0",
	3: "0",
	4: "0",
	5: "0",
	6: "0",
	7: "0",
	8: "0",
	9: "0",
	10: "1000",
	11: "2000",
	12: "3000",
	13: "4000",
	14: "8000",
	15: "40000",
	16: "80000",
	17: "4 Lakh",
	18: "10 Lakh",
	19: "20 Lakh",
	20: "30 Lakh",
	21: "40 Lakh",
};

const Dashboard = () => {
	const { user, users, activeUsers, loading } = useSelector((state) => state.user);
	const { referralAmount, level } = useSelector((state) => state.update);
	const { events } = useSelector((state) => state.event);
	const [ongoingEventData, setOngoingEventData] = useState([]);
	const [levelsdata, setLevelsData] = useState([]);
	const [todaysJoining, setTodaysJoining] = useState([]);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const refreshPage = () => {
		window.location.reload();
	};

	const addBonus = (data) => {
		console.log(data);
		if (!data.award && !data.cash) {
			toast.error("No reward for this level!!");
			return;
		}
		const encodedData = JSON.stringify(data);
		navigate(`/request/bonus?data=${encodedData}`);
	};

	useEffect(() => {
		const token = Cookies.get("token");
		if (token) {
			dispatch(loadUser());
			dispatch(generateReferal());
			dispatch(getAllUsers());
			dispatch(getActiveUsers());
			dispatch(getActiveUsers());
			dispatch(getAllEvents());
			dispatch(generateReferalLink());
		}
	}, []);

	useEffect(() => {
		if (events) {
			const currentDate = new Date();
			const data = events
				.map((event) => {
					const eventStartDate = new Date(event.eventDate);
					const eventEndDate = new Date(event.eventDate);
					eventEndDate.setHours(eventEndDate.getHours() + event.eventDuration);

					// Check if the current date is between event start and end date
					const isOngoing = currentDate >= eventStartDate && currentDate <= eventEndDate;
					// If the event is ongoing, include it in the data
					if (isOngoing) {
						const date = eventStartDate.toLocaleDateString();
						return {
							data: [event?.eventManager?.firstName, date, event?.eventPurpose, `${event?.peopleJoin} Member`, event?.eventLocation],
							_id: event._id,
						};
					}
					// Otherwise, return null for events that are not ongoing
					return null;
				})
				// Filter out null values (events that are not ongoing)
				.filter((event) => event !== null);
			setOngoingEventData(data);
		}
	}, [events]);

	useEffect(() => {
		if (users) {
			const data = users.map((user, idx) => {
				return {
					data: [idx + 1, user?.userId, `${user?.firstName} ${user?.lastName}`, user?.contact, user?.email, user?.createdAt],
					status: user?.rank,
					_id: user?._id,
				};
			});
			dispatch(calculateReferral(user?._id));
			dispatch(calculateLevel());
			setLevelsData(data);
		}
	}, [users]);

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
				return userCreatedAt.getTime() === today.getTime();
			});

			// Map filtered users to the desired format
			const data = todaysJoiningUsers.map((user, idx) => {
				return {
					data: [idx + 1, user.userId, `${user.firstName} ${user.lastName}`, user.contact, user.email, user.createdAt],
					status: user.rank,
					_id: user._id,
				};
			});

			// Set the state with filtered users
			setTodaysJoining(data);
		}
	}, [users]);

	if (loading) {
		return <Loader />;
	}
	return (
		<div className="admin-container">
			<AdminSidebar />
			<main className="dashboard">
				<Bar heading="Dashboard" />
				{/* WIDGET CONTAINER */}
				{user?.role === "admin" ? (
					<section className="widget-container">
						<WidgetItem
							value={users?.length}
							heading="Users"
							color="rgba(0,115,255)"
							path="M11.3902 10.9393C14.8214 10.9393 17.7511 11.4832 17.7511 13.66C17.7511 15.8359 14.8402 16.3997 11.3902 16.3997C7.95901 16.3997 5.02925 15.8557 5.02925 13.6798C5.02925 11.5031 7.9402 10.9393 11.3902 10.9393ZM16.8762 9.62854C18.188 9.60422 19.5983 9.78434 20.1194 9.91223C21.2234 10.1293 21.9496 10.5724 22.2504 11.2163C22.5047 11.745 22.5047 12.3583 22.2504 12.886C21.7902 13.8848 20.3065 14.2054 19.7299 14.2883C19.6108 14.3063 19.515 14.2027 19.5275 14.0829C19.8221 11.3154 17.4788 10.0032 16.8727 9.70149C16.8467 9.68798 16.8413 9.66726 16.844 9.65465C16.8458 9.64565 16.8565 9.63124 16.8762 9.62854ZM6.00676 9.6289C6.02646 9.6316 6.03631 9.64601 6.0381 9.65411C6.04079 9.66762 6.03541 9.68744 6.01034 9.70185C5.40326 10.0035 3.05999 11.3157 3.35458 14.0824C3.36711 14.2031 3.2722 14.3057 3.15311 14.2886C2.57647 14.2058 1.09279 13.8852 0.632554 12.8864C0.377365 12.3577 0.377365 11.7453 0.632554 11.2167C0.93341 10.5727 1.65869 10.1296 2.76272 9.91169C3.28474 9.7847 4.6941 9.60458 6.00676 9.6289ZM11.3902 0.399658C13.7263 0.399658 15.5995 2.28193 15.5995 4.63251C15.5995 6.98219 13.7263 8.86626 11.3902 8.86626C9.05409 8.86626 7.1809 6.98219 7.1809 4.63251C7.1809 2.28193 9.05409 0.399658 11.3902 0.399658ZM17.1046 1.10555C19.361 1.10555 21.133 3.24089 20.5295 5.61939C20.1221 7.22067 18.6473 8.28429 17.0043 8.24106C16.8395 8.23656 16.6775 8.22125 16.5208 8.19423C16.407 8.17442 16.3497 8.04563 16.4142 7.95017C17.041 7.02254 17.3983 5.90669 17.3983 4.70888C17.3983 3.45884 17.0079 2.29345 16.33 1.33791C16.3085 1.30819 16.2924 1.26226 16.3139 1.22804C16.3318 1.20012 16.365 1.18571 16.3963 1.1785C16.6246 1.13167 16.8592 1.10555 17.1046 1.10555ZM5.77709 1.10546C6.02243 1.10546 6.25703 1.13158 6.48625 1.17841C6.51669 1.18562 6.55072 1.20093 6.56863 1.22795C6.58922 1.26217 6.574 1.3081 6.55251 1.33782C5.87469 2.29336 5.48429 3.45875 5.48429 4.70879C5.48429 5.9066 5.84156 7.02245 6.46834 7.95008C6.53281 8.04554 6.4755 8.17433 6.36179 8.19414C6.2042 8.22206 6.04303 8.23647 5.87827 8.24097C4.23521 8.2842 2.76048 7.22058 2.35307 5.61931C1.74867 3.2408 3.52068 1.10546 5.77709 1.10546Z"
						/>
						<WidgetItem
							value={activeUsers?.length}
							heading="Active Users"
							color="rgba(0,198,202)"
							path="M8.08346 12.0213C12.0688 12.0213 15.4328 12.6547 15.4328 15.1039C15.4328 17.5513 12.0473 18.1636 8.08346 18.1636L7.81273 18.1626C3.94696 18.1338 0.734131 17.4745 0.734131 15.0809C0.734131 12.6336 4.11966 12.0213 8.08346 12.0213ZM14.3038 10.5468C15.8195 10.518 17.4496 10.7221 18.0514 10.8659C19.3273 11.1102 20.1659 11.6075 20.5132 12.3329C20.8078 12.927 20.8078 13.617 20.5132 14.2111C19.9819 15.3341 18.2676 15.6954 17.6013 15.7883C17.4633 15.8075 17.3528 15.6925 17.3674 15.5564C17.7079 12.4441 15.0005 10.9684 14.2999 10.6292C14.2706 10.6129 14.2637 10.5899 14.2666 10.5746C14.2686 10.565 14.2813 10.5497 14.3038 10.5468ZM8.08346 0.163574C10.7831 0.163574 12.9465 2.28222 12.9465 4.92599C12.9465 7.56975 10.7831 9.6884 8.08346 9.6884C5.38483 9.6884 3.22044 7.56975 3.22044 4.92599C3.22044 2.28222 5.38483 0.163574 8.08346 0.163574ZM14.568 0.959002C17.1757 0.959002 19.2226 3.36033 18.525 6.03476C18.0543 7.83719 16.3508 9.03402 14.4526 8.98515C14.2618 8.98132 14.0749 8.96311 13.8929 8.93341C13.7618 8.91041 13.6952 8.76572 13.7706 8.65839C14.4946 7.61488 14.9076 6.35864 14.9076 5.01232C14.9076 3.60564 14.4575 2.29574 13.6737 1.21964C13.6483 1.1861 13.6297 1.13532 13.6551 1.09603C13.6747 1.06537 13.7138 1.04812 13.75 1.04045C14.0142 0.987749 14.2852 0.959002 14.568 0.959002Z"
						/>
					</section>
				) : (
					<section className="widget-container">
						<WidgetItem
							value={bonusMap[level]}
							heading="Level Bonus"
							color="rgba(0,115,255)"
							path="M22.5 22.5H16.5V3H22.5V22.5ZM15 22.5H9V9H15V22.5ZM7.5 22.5H1.5V13.5H7.5V22.5Z"
						/>
						<WidgetItem
							value={referralAmount}
							heading="Referral Income"
							color="rgba(0,115,255)"
							path="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5C21 3.34 19.66 2 18 2C16.34 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12C3 13.66 4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.35C15.11 18.56 15.08 18.78 15.08 19C15.08 20.61 16.39 21.92 18 21.92C19.61 21.92 20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08Z"
						/>
						<WidgetItem
							value={referralAmount - user?.amountWithdrawn}
							heading="Current Balance"
							color="rgba(0,115,255)"
							path="M18 7H15.79C15.5974 6.27179 15.257 5.59101 14.79 5H18C18.2652 5 18.5196 4.89464 18.7071 4.70711C18.8946 4.51957 19 4.26522 19 4C19 3.73478 18.8946 3.48043 18.7071 3.29289C18.5196 3.10536 18.2652 3 18 3H6.99999C6.73477 3 6.48042 3.10536 6.29288 3.29289C6.10534 3.48043 5.99999 3.73478 5.99999 4C5.99999 4.26522 6.10534 4.51957 6.29288 4.70711C6.48042 4.89464 6.73477 5 6.99999 5H10.5C11.1602 5.00232 11.8063 5.19134 12.3637 5.54523C12.9211 5.89913 13.367 6.40346 13.65 7H6.99999C6.73477 7 6.48042 7.10536 6.29288 7.29289C6.10534 7.48043 5.99999 7.73478 5.99999 8C5.99999 8.26522 6.10534 8.51957 6.29288 8.70711C6.48042 8.89464 6.73477 9 6.99999 9H14C13.8801 9.8306 13.4658 10.5905 12.8325 11.1411C12.1992 11.6918 11.3892 11.9966 10.55 12H6.99999C6.95344 11.9953 6.90654 11.9953 6.85999 12C6.79372 11.9897 6.72625 11.9897 6.65999 12C6.59182 12.0232 6.52771 12.057 6.46999 12.1L6.34999 12.17C6.29521 12.2195 6.24803 12.2768 6.20999 12.34C6.17649 12.3843 6.14641 12.4311 6.11999 12.48C6.11109 12.5397 6.11109 12.6003 6.11999 12.66C6.04873 12.7597 6.00712 12.8776 5.99999 13C5.99531 13.0465 5.99531 13.0935 5.99999 13.14C5.98967 13.2063 5.98967 13.2737 5.99999 13.34C6.0232 13.4082 6.05694 13.4723 6.09999 13.53C6.09999 13.53 6.09999 13.61 6.16999 13.65L12.17 20.65C12.3424 20.8516 12.5878 20.9764 12.8522 20.997C13.1166 21.0177 13.3784 20.9324 13.58 20.76C13.7816 20.5876 13.9064 20.3422 13.927 20.0778C13.9476 19.8134 13.8624 19.5516 13.69 19.35L9.17999 14H10.5C11.876 14.0057 13.2042 13.4954 14.2225 12.5697C15.2407 11.6441 15.8749 10.3704 16 9H18C18.2652 9 18.5196 8.89464 18.7071 8.70711C18.8946 8.51957 19 8.26522 19 8C19 7.73478 18.8946 7.48043 18.7071 7.29289C18.5196 7.10536 18.2652 7 18 7Z"
						/>
					</section>
				)}
				{/* DASHBOARD CHART */}
				{user?.role === "admin" ? (
					<section className="levels">
						<TableContainer className="dashboardOngoingEventTableContainer">
							<TableHeading>
								<p>Today&apos;s Joining</p>
								<p>
									<MdRefresh style={{ cursor: "pointer" }} onClick={refreshPage} /> <BsThreeDotsVertical />
								</p>
							</TableHeading>
							<Table>
								<TableHeaders
									headers={LevelHeaders}
									style={{
										gridTemplateColumns: `repeat(${levelsHeaders.length + 2},1fr)`,
										backgroundColor: "#CACACB",
									}}
								/>
								<TableBody TableRow={DashboardRow} data={todaysJoining} />
							</Table>
						</TableContainer>
					</section>
				) : null}

				{/* ONGOING EVENT TABLE */}
				{ongoingEventData?.length > 0 && (
					<section className="ongoing">
						<TableContainer className="ongoingEventTableContainer">
							<TableHeading>
								<p>Ongoing Events</p>
							</TableHeading>
							<Table>
								<TableHeaders
									style={{
										gridTemplateColumns: `repeat(${ongoingEventsHeaders.length},1fr)`,
									}}
									headers={ongoingEventsHeaders}
								/>
								<TableBody TableRow={ongoingEventRow} data={ongoingEventData} />
							</Table>
						</TableContainer>
					</section>
				)}

				{/* LEVELS SECTION TABLE */}
				{user?.role === "user" && (
					<section className="levels">
						<TableContainer className="dashboardOngoingEventTableContainer">
							<TableHeading>
								<p>Your Levels </p>
							</TableHeading>
							<Table>
								<TableHeaders
									headers={LevelDummyHeaders}
									style={{
										gridTemplateColumns: `repeat(${LevelDummyHeaders.length},1fr)`,
										backgroundColor: "#CACACB",
									}}
								/>
								<TableBody TableRow={LevelRow} onClick={addBonus} data={levelData.filter((i, idx) => idx <= level)} />
							</Table>
						</TableContainer>
						<br />
						<TableContainer className="dashboardOngoingEventTableContainer">
							<TableHeading>
								<p>Levels </p>
							</TableHeading>
							<Table>
								<TableHeaders
									headers={LevelDummyHeaders}
									style={{
										gridTemplateColumns: `repeat(${LevelDummyHeaders.length},1fr)`,
										backgroundColor: "#CACACB",
									}}
								/>
								<TableBody TableRow={ConstantRow} data={levelData} />
							</Table>
						</TableContainer>
					</section>
				)}
			</main>
		</div>
	);
};

const WidgetItem = ({ heading, value, path }) => (
	<article className="widget">
		<div>
			<i>
				<svg width="25" height="25" viewBox="0 0 23 17" fill="none" xmlns="">
					<path d={path} fill="#F9F8F8" />
				</svg>
			</i>
			<h4>{heading}</h4>
		</div>
		<h2>{Math.abs(value)}</h2>
	</article>
);

export default Dashboard;
