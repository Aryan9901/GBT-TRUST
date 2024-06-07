import { AdminSidebar, Bar, TableBody, Table, TableContainer, TableHeaders, TableHeading, ProgramRow, Program2Row } from "../components";
import { IoIosArrowForward } from "react-icons/io";
import { FaChildren } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { FaSort } from "react-icons/fa";
import { useEffect, useState } from "react";
import { acceptEvent, getAllEvents } from "../redux/actions/";
import { toast } from "react-toastify";

//  ?--- dropdown indicator
const eventHeader = ["Event Name", "Requested By", "Request Date", "Program Date", "Budget", "Action"];
const passedEventHeader = ["Event Name", "Requested By", "Program Date", "Budget", "Action"];

function OurProgram() {
	const dispatch = useDispatch();
	const { events, message, error } = useSelector((state) => state.event);
	const { user } = useSelector((state) => state.user);

	const [usereventdata, setUserEventdata] = useState([]);
	const [userPassedeventdata, setUserPassedEventdata] = useState([]);
	const [eventdata, setEventdata] = useState([]);
	const [passedEventdata, setPassedEventdata] = useState([]);

	const acceptHandler = (id) => {
		dispatch(acceptEvent(id));
		dispatch(getAllEvents());
	};

	useEffect(() => {
		dispatch(getAllEvents());
	}, [dispatch]);

	useEffect(() => {
		if (events) {
			const currentDate = new Date();
			const upcomingEvents = [];
			const passedEvents = [];

			events.forEach((event) => {
				// Convert eventDate to a Date object
				const eventDate = new Date(event?.eventDate);

				const createdDate = new Date(event?.createdAt)?.toLocaleDateString();
				if (eventDate >= currentDate) {
					// Event is upcoming or today
					const readableDate = eventDate?.toLocaleDateString();
					upcomingEvents?.push({
						data: [
							event?.eventName,
							event?.eventManager?.firstName + " " + event?.eventManager?.lastName,
							createdDate,
							readableDate,
							event?.eventBudget,
						],
						user: event?.eventManager?._id,
						status:
							user?.role === "admin" ? (
								<button
									className={
										event?.status === "approved"
											? "greenbg"
											: event.status === "completed"
											? "purplebg"
											: event.status === "ongoing"
											? "yellowbg"
											: "redbg"
									}
									style={{ borderRadius: "8px", color: "#fcfcfc" }}
									onClick={() => acceptHandler(event?._id)}
								>
									{event?.status}
								</button>
							) : (
								event?.status
							),
						_id: event._id,
					});
				} else {
					// Event date has passed
					const readableDate = eventDate.toLocaleDateString();
					passedEvents.push({
						data: [
							event?.eventName,
							event?.eventManager?.firstName + " " + event?.eventManager?.lastName,
							readableDate,
							event?.eventBudget,
						],
						status: event?.status,
						_id: event?._id,
						user: event?.eventManager?._id,
					});
				}
			});

			const userEvent = upcomingEvents.filter((event) => event?.user === user?._id);
			const userPassedEvent = passedEvents.filter((event) => event?.user === user?._id);
			setUserPassedEventdata(userPassedEvent);
			setUserEventdata(userEvent);
			// Update state with upcoming and passed events
			setEventdata(upcomingEvents);
			setPassedEventdata(passedEvents);
		}
	}, [events]);

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
		<div className="admin-container">
			<AdminSidebar />
			<main className="ourProgram">
				<Bar heading="Programs" />
				<section className="Programs">
					<div className="cardWidget">
						<CardWidget
							style={{ backgroundColor: "#003D79" }}
							heading="Upcoming"
							value={eventdata.length}
							Icon={FaChildren}
							Action={IoIosArrowForward}
						/>
						<CardWidget
							style={{ backgroundColor: "#003D79" }}
							heading="Program Done"
							value={passedEventdata.length}
							Icon={FaChildren}
							Action={IoIosArrowForward}
						/>
						<CardWidget style={{ backgroundColor: "#003D79" }} heading="Program Report" Icon={FaChildren} Action={IoIosArrowForward} />
					</div>

					{user?.role === "user" && (
						<>
							{usereventdata.length > 0 && (
								<TableContainer className="mini-table1">
									<TableHeading>
										<p>Program Request</p>
									</TableHeading>
									<Table>
										<TableHeaders
											style={{
												gridTemplateColumns: `repeat(${eventHeader.length},1fr)`,
											}}
											headers={eventHeader}
										/>
										<TableBody TableRow={ProgramRow} data={usereventdata} />
									</Table>
								</TableContainer>
							)}

							{userPassedeventdata.length > 0 && (
								<TableContainer className="mini-table1">
									<TableHeading>
										<p>Program History</p>
									</TableHeading>
									<Table>
										<TableHeaders
											style={{
												gridTemplateColumns: `repeat(${passedEventHeader.length},1fr)`,
											}}
											headers={passedEventHeader}
										/>
										<TableBody TableRow={ProgramRow} data={userPassedeventdata} />
									</Table>
								</TableContainer>
							)}
						</>
					)}

					{user?.role === "admin" && (
						<>
							<TableContainer className="mini-table1">
								<TableHeading>
									<p>Program Request</p>
								</TableHeading>
								<Table>
									<TableHeaders
										style={{
											gridTemplateColumns: `repeat(${eventHeader.length},1fr)`,
										}}
										headers={eventHeader}
									/>
									<TableBody TableRow={Program2Row} data={eventdata} />
								</Table>
							</TableContainer>
						</>
					)}
				</section>
			</main>
		</div>
	);
}

export default OurProgram;

export const CardWidget = ({ heading, Icon, value, style }) => {
	return (
		<article className="pinCard" style={style}>
			<Icon />
			<div>
				<h3>{heading}</h3>
				{value && <p>{value}</p>}
			</div>
		</article>
	);
};
