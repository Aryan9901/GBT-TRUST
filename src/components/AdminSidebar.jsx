/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { AiFillFileText } from "react-icons/ai";
import { HiMenuAlt4 } from "react-icons/hi";
import { RiDashboardFill, RiBankFill } from "react-icons/ri";
import { IoMdPerson, IoMdKey, IoMdShare } from "react-icons/io";
import { MdGroup } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { ImTree } from "react-icons/im";
import { FaPeopleGroup } from "react-icons/fa6";
import userImg from "../assets/GBT.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logoutUser } from "../redux/actions/index";

const AdminSidebar = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [showModal, setShowModal] = useState(false);
	const [phoneActive, setPhoneActive] = useState(window.innerWidth < 1000);
	const { message, error, user } = useSelector((state) => state.user);

	const resizeHandler = () => {
		setPhoneActive(window.innerWidth < 1000);
	};

	useEffect(() => {
		window.addEventListener("resize", resizeHandler);

		return () => {
			window.removeEventListener("resize", resizeHandler);
		};
	}, []);

	useEffect(() => {
		if (message) {
			toast.success(message);
			dispatch({ type: "CLEAR_MESSAGES" });
		}
		if (error) {
			dispatch({ type: "CLEAR_ERRORS" });
		}
	}, [message, error, user, dispatch]);

	const logoutHandler = () => {
		dispatch(logoutUser());
		navigate("/");
	};

	return (
		<>
			{phoneActive && (
				<button id="hamburger" onClick={() => setShowModal(true)}>
					<HiMenuAlt4 />
				</button>
			)}

			<aside
				style={
					phoneActive
						? {
								width: "20rem",
								height: "100vh",
								position: "fixed",
								top: 0,
								left: showModal ? "0" : "-20rem",
								transition: "all 0.5s",
						  }
						: {}
				}
			>
				<img src={userImg} alt="user image" />
				<h2>
					{user?.firstName} {user?.lastName}
				</h2>
				<h5>{user?.role}</h5>
				<DivOne location={location} />

				<button onClick={logoutHandler} id="logout-sidebar">
					Logout
				</button>

				{phoneActive && (
					<button id="close-sidebar" onClick={() => setShowModal(false)}>
						Close
					</button>
				)}
			</aside>
		</>
	);
};

const DivOne = ({ location }) => {
	const { user } = useSelector((state) => state.user);
	return (
		<div>
			<ul>
				<Li url="/dashboard" text="Dashboard" Icon={RiDashboardFill} location={location} />
				<Li url="/profile" text="Profile" Icon={IoMdPerson} location={location} />
				<Li url="/team" text="Team" Icon={MdGroup} location={location} />
				<Li url="/bank/transfer" text="Bank Transfer" Icon={RiBankFill} location={location} />
				<Li url="/statements" text="Statements" Icon={FaCalendarAlt} location={location} />
				{user?.role === "user" && <Li url="/refers" text="Refers" Icon={IoMdShare} location={location} />}
				{user?.role === "user" && <Li url="/request" text="Create a Request" Icon={FaCalendarAlt} location={location} />}
				<Li url="/tree" text="My Tree" Icon={ImTree} location={location} />
				<Li url="/program" text="Our Program" Icon={FaPeopleGroup} location={location} />
				{user?.role === "admin" && <Li url="/kyc" text="KYC Approvals" Icon={FaPeopleGroup} location={location} />}
			</ul>
		</div>
	);
};
const Li = ({ url, location, text, Icon }) => (
	<li
		style={{
			backgroundColor: location.pathname.includes(url) ? "#AC3E2E" : "transparent",
		}}
	>
		<Link
			to={url}
			style={{
				fontWeight: location.pathname.includes(url) ? "bold" : "400",
				color: location.pathname.includes(url) ? "white" : "black",
			}}
		>
			<Icon
				style={{
					color: location.pathname.includes(url) ? "white" : "black",
				}}
			/>
			{text}
		</Link>
	</li>
);

export default AdminSidebar;
