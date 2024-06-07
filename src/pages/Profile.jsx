import { Bar, AdminSidebar, ProfileComponents, ContactComponent, BankComponent, SettingsComponent, Loader } from "../components";
import { MdEmail, MdKeyboardArrowDown } from "react-icons/md";
import { useEffect, useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getTeam, loadUser } from "../redux/actions";
import { calculateLevel } from "../redux/actions/user.action";

const levelMap = {
	0: "JOINING",
	1: "JOINING",
	2: "JOINING",
	3: "JOINING",
	4: "JOINING",
	5: "JOINING",
	6: "JOINING",
	7: "JOINING",
	8: "JOINING",
	9: "JOINING",
	10: "SILVER",
	11: "GOLD",
	12: "STARGOLD",
	13: "PLATINUM",
	14: "EMRALD",
	15: "RUBI",
	16: "DIAMOND",
	17: "DOUBLE DIAMOND",
	18: "STAR DIAMOND",
	19: "CROWN",
	20: "STAR CROWN",
	21: "DOUBLE CROWN",
};

const Profile = () => {
	const { user, loading } = useSelector((state) => state.user);
	const { level } = useSelector((state) => state.update);
	const { teams } = useSelector((state) => state.team);
	const dispatch = useDispatch();

	const [active, setActive] = useState("personal");

	useEffect(() => {
		dispatch(loadUser());
		dispatch(getTeam());
		dispatch(calculateLevel());
	}, []);

	// const [isAdmin, setIsAdmin] = useState("admin");
	if (loading) {
		return <Loader />;
	}

	return (
		<div className="admin-container">
			<AdminSidebar />
			<main className="dashboard">
				<Bar heading="Profile" />
				<section className="profile">
					{user?.role === "admin" ? (
						<div className="avatar-section" style={{ backgroundColor: "#f1e4e2" }}>
							<h1>
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path
										d="M12.0012 9.35996C11.6543 9.35996 11.3109 9.42828 10.9904 9.56101C10.67 9.69374 10.3788 9.88829 10.1336 10.1336C9.88832 10.3788 9.69377 10.67 9.56103 10.9904C9.4283 11.3109 9.35999 11.6543 9.35999 12.0012C9.35999 12.348 9.4283 12.6915 9.56103 13.0119C9.69377 13.3323 9.88832 13.6235 10.1336 13.8688C10.3788 14.114 10.67 14.3086 10.9904 14.4413C11.3109 14.574 11.6543 14.6424 12.0012 14.6424C12.7017 14.6422 13.3734 14.3638 13.8686 13.8683C14.3638 13.3729 14.6419 12.7011 14.6418 12.0006C14.6416 11.3001 14.3632 10.6283 13.8678 10.1331C13.3723 9.63792 12.7005 9.3598 12 9.35996H12.0012ZM12.0012 6.23996C12.3479 6.2398 12.6911 6.17136 13.0114 6.03854C13.3316 5.90573 13.6226 5.71113 13.8676 5.46587C14.1126 5.22062 14.307 4.9295 14.4395 4.60914C14.572 4.28878 14.6401 3.94545 14.64 3.59876C14.6398 3.25207 14.5714 2.90881 14.4386 2.58857C14.3057 2.26833 14.1112 1.97739 13.8659 1.73235C13.6206 1.48732 13.3295 1.29299 13.0092 1.16046C12.6888 1.02793 12.3455 0.959804 11.9988 0.959961C11.2986 0.960279 10.6272 1.23873 10.1324 1.73405C9.6375 2.22937 9.35967 2.90099 9.35999 3.60116C9.3603 4.30133 9.63875 4.9727 10.1341 5.46757C10.6294 5.96244 11.301 6.24028 12.0012 6.23996ZM12.0012 17.76C11.3007 17.76 10.6289 18.0382 10.1336 18.5336C9.63825 19.0289 9.35999 19.7007 9.35999 20.4012C9.35999 21.1017 9.63825 21.7735 10.1336 22.2688C10.6289 22.7641 11.3007 23.0424 12.0012 23.0424C12.7017 23.0424 13.3735 22.7641 13.8688 22.2688C14.3641 21.7735 14.6424 21.1017 14.6424 20.4012C14.6424 19.7007 14.3641 19.0289 13.8688 18.5336C13.3735 18.0382 12.7017 17.76 12.0012 17.76Z"
										fill="#003D79"
									/>
								</svg>
							</h1>
							<img src={user?.avatar} alt="user iamge" />
							<h3>{user?.firstName + " " + user?.lastName}</h3>
							<h5>Admin</h5>
							<h5>
								Rank: <span>{user?.rank}</span>
							</h5>
						</div>
					) : (
						<div className="avatar-section">
							<img src={user?.avatar} alt="user iamge" />
							<h3>{user?.firstName + " " + user?.lastName}</h3>
							<h5>
								<span style={{ textTransform: "capitalize" }}>{user?.activeStatus}</span>
							</h5>
						</div>
					)}
					{user?.role === "admin" ? (
						<div className="container">
							<div className="below">
								<h1>Personal Details</h1>
								<h2>
									<FaPhoneAlt /> {user?.contact}
								</h2>
								<h2>
									<MdEmail /> {user?.email}
								</h2>
								<h2>
									<FaLocationDot /> {user?.city}
									{user?.state} ({user?.postalCode})
								</h2>
							</div>
						</div>
					) : (
						<div className="usertop">
							<div className="header">
								<div>
									<h1>Membership Package:</h1>
									<h3>{user?.plan}</h3>
								</div>
								<div>
									<h1>Membership Expire on:</h1>
									<h3>
										{new Date(user?.membershipExpiry).toLocaleDateString("en-GB", {
											day: "2-digit",
											month: "2-digit",
											year: "numeric",
										})}
									</h3>
								</div>
								<div>
									<h1>Rank:</h1>
									<h3>{levelMap[level]}</h3>
								</div>
							</div>
							<div className="footer">
								<div className="card">
									<div className="heading">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<g clipPath="url(#clip0_43_618)">
												<path
													d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5C21 3.34 19.66 2 18 2C16.34 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12C3 13.66 4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.35C15.11 18.56 15.08 18.78 15.08 19C15.08 20.61 16.39 21.92 18 21.92C19.61 21.92 20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08Z"
													fill="#F9F8F8"
												/>
											</g>
											<defs>
												<clipPath id="clip0_43_618">
													<rect width="24" height="24" fill="white" />
												</clipPath>
											</defs>
										</svg>
										Total Refers
									</div>
									<div className="content">{teams?.length - 1 || 0}</div>
								</div>

								<div className="card">
									<div className="heading">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<g clipPath="url(#clip0_43_618)">
												<path
													d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5C21 3.34 19.66 2 18 2C16.34 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12C3 13.66 4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.35C15.11 18.56 15.08 18.78 15.08 19C15.08 20.61 16.39 21.92 18 21.92C19.61 21.92 20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08Z"
													fill="#F9F8F8"
												/>
											</g>
											<defs>
												<clipPath id="clip0_43_618">
													<rect width="24" height="24" fill="white" />
												</clipPath>
											</defs>
										</svg>
										Total Refers
									</div>
									<div className="content">{teams?.length - 1 || 0}</div>
								</div>

								<div className="card">
									<div className="heading">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<g clipPath="url(#clip0_43_618)">
												<path
													d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5C21 3.34 19.66 2 18 2C16.34 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12C3 13.66 4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.35C15.11 18.56 15.08 18.78 15.08 19C15.08 20.61 16.39 21.92 18 21.92C19.61 21.92 20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08Z"
													fill="#F9F8F8"
												/>
											</g>
											<defs>
												<clipPath id="clip0_43_618">
													<rect width="24" height="24" fill="white" />
												</clipPath>
											</defs>
										</svg>
										Total Refers
									</div>
									<div className="content">{teams?.length - 1 || 0}</div>
								</div>
							</div>
						</div>
					)}
					<div className="profile-navigator">
						<div
							style={
								active === "personal" ? { borderBottom: "3px solid #ac3e2e", color: "#000" } : { background: "#fff", color: "#000" }
							}
							onClick={(e) => {
								e.preventDefault();
								setActive("personal");
							}}
							className="btn"
						>
							Personal Details
						</div>
						<div
							style={active === "bank" ? { background: "#ac3e2e", color: "#fff" } : { background: "#fff", color: "#000" }}
							onClick={(e) => {
								e.preventDefault();
								setActive("bank");
							}}
							className="btn"
						>
							Bank Details
						</div>
						<div
							style={active === "contact" ? { background: "#ac3e2e", color: "#fff" } : { background: "#fff", color: "#000" }}
							onClick={(e) => {
								e.preventDefault();
								setActive("contact");
							}}
							className="btn"
						>
							Contact Details
						</div>
						<div
							style={active === "settings" ? { background: "#ac3e2e", color: "#fff" } : { background: "#fff", color: "#000" }}
							onClick={(e) => {
								e.preventDefault();
								setActive("settings");
							}}
							className="btn"
						>
							User Settings
						</div>
					</div>
					<div className="bottom">
						{active === "personal" ? (
							<ProfileComponents />
						) : active === "bank" ? (
							<BankComponent />
						) : active === "contact" ? (
							<ContactComponent />
						) : (
							active === "settings" && <SettingsComponent />
						)}
					</div>
				</section>
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
			<p>
				Today <MdKeyboardArrowDown />{" "}
			</p>
		</div>
		<h2>{Math.abs(value)}</h2>
	</article>
);

export default Profile;
