import { AdminSidebar, Bar, Loader } from "../components";
import emailjs from "emailjs-com";
import { TbHandClick } from "react-icons/tb";
import { AiFillLike } from "react-icons/ai";
import { FaPercentage } from "react-icons/fa";
import { LineChart } from "../components/Chart";
import { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { sendMail } from "../redux/actions";
import { toast } from "react-toastify";
import { trackUser } from "../redux/actions/user.action";

const events = ["Registered", "Payment", "Successful"];

const Refer = () => {
	const [email, setEmail] = useState("");
	const [trackEmail, setTrackEmail] = useState("");
	const [reset, setReset] = useState(false);
	const { user, users, activeUsers, track } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const copyToClipboard = () => {
		// Select the referral code text
		const referralCode = `https://gbt-trust.vercel.app/signup?code=${user?.referralCode}`;
		navigator.clipboard
			.writeText(referralCode)
			.then(() => {
				toast.success("Code copied to clipboard");
			})
			.catch((err) => {
				console.error("Failed to copy:", err);
			});
	};
	const sendEmail = async (e) => {
		e.preventDefault();
		emailjs
			.send(
				"gbt",
				"template_03je64k",
				{
					name_from: user.name,
					referralCode: user.referralCode,
					to_email: email,
					from_name: user.firstName + user.lastName,
					from_mail: user.email,
				},
				"1DqRXIf7r7ATgeDMQ"
			)
			.then(
				(result) => {
					toast.success("Mail Sent ✔️");
					console.log(result.text);
				},
				(error) => {
					toast.error("Mail Not Sent");
					console.log(error);
				}
			);
	};

	const trackBtn = () => {
		if (trackEmail) {
			dispatch(trackUser(trackEmail));
		} else {
			toast.error("Please Enter Email");
		}
	};

	useEffect(() => {
		if (!trackEmail) {
			setReset(false);
		} else {
			setReset(true);
		}
	}, [trackEmail, track]);

	if (user?.role === "admin") {
		return (
			<div className="admin-container">
				<AdminSidebar />
				<main className="refers">
					<Bar />
					<h2 style={{ color: "red", fontSize: "1.4rem", textAlign: "center" }}>You are not Authorized for visiting this page</h2>
				</main>
			</div>
		);
	}

	if (user?.verified !== "approved") {
		return (
			<div className="admin-container">
				<AdminSidebar />
				<main className="refers">
					<Bar />
					<h2 style={{ color: "red", fontSize: "1.4rem", textAlign: "center" }}>You are not approved for visiting this page</h2>
				</main>
			</div>
		);
	}

	return (
		<div className="admin-container">
			<AdminSidebar />
			<main className="refers">
				<Bar heading="Refers" />
				<section className="widget-container">
					<WidgetItem value={users?.length} heading="Users" color="rgba(0,115,255)" Icon={TbHandClick} />
					<WidgetItem value={activeUsers?.length} heading="Active Users" color="rgba(0,198,202)" Icon={AiFillLike} />
					<WidgetItem value={user?.balance} heading="Current Balance" color="rgba(0,115,255)" Icon={FaPercentage} />
				</section>
				<section className="referalContainer">
					<div className="invitePeople">
						<h3>Invite People</h3>
						<div>
							<input
								onChange={(e) => setEmail(e.target.value)}
								value={email}
								id="email"
								type="text"
								placeholder="Enter Email Address"
							/>
							<button onClick={sendEmail}>
								Send <IoSend />
							</button>
						</div>
					</div>
					<div className="myRefferalLink">
						<h3>My Refferal Link</h3>
						<div>
							<input type="text" value={`https://gbt-trust.vercel.app/signup?code=${user?.referralCode}`} />
							<button onClick={copyToClipboard}>Copy</button>
						</div>
					</div>
				</section>
				<section className="TractContainer">
					<div className="trackConversion">
						<div className="left">
							<h1>Track Conversion</h1>
							<div>
								<input
									type="email"
									name="email"
									id="email"
									placeholder="Enter Email Address"
									onChange={(e) => setTrackEmail(e.target.value)}
								/>
								<button onClick={trackBtn}>
									Track
									<svg width="19" height="18" viewBox="0 0 19 18" fill="" xmlns="http://www.w3.org/2000/svg">
										<path
											d="M0.372911 3.67292C0.112911 1.33892 2.51591 -0.375085 4.63891 0.630915L16.5829 6.28892C18.8709 7.37191 18.8709 10.6279 16.5829 11.7109L4.63891 17.3699C2.51591 18.3759 0.113911 16.6619 0.372911 14.3279L0.852911 9.99992H8.97091C9.23613 9.99992 9.49048 9.89456 9.67802 9.70702C9.86555 9.51949 9.97091 9.26513 9.97091 8.99992C9.97091 8.7347 9.86555 8.48035 9.67802 8.29281C9.49048 8.10527 9.23613 7.99992 8.97091 7.99992L0.853911 7.99992L0.372911 3.67292Z"
											fill="#F9F8F8"
										/>
									</svg>
								</button>
							</div>
							<div className="timeline">
								{events.map((e, i) => (
									<div className="event-items" key={i}>
										<div className="event" style={track?.step >= i + 1 ? (reset ? { backgroundColor: "green" } : {}) : {}}>
											{i + 1}
										</div>
										<p className="timeline-content">{e}</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
};

const WidgetItem = ({ heading, value, Icon }) => (
	<article className="widget">
		<h4>{heading}</h4>
		<i>
			<Icon />
		</i>
		<h2>{Math.abs(value)}</h2>
	</article>
);

export default Refer;
