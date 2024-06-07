import { AdminSidebar, Bar, Loader, OwnerRow, Table, TableBody, TableContainer, TableHeaders, TableHeading, TextLoader } from "../components";
import Select, { components } from "react-select";
import { LineChart } from "../components/Chart";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTeam } from "../redux/actions";

const teamGroupHeaders = ["S No", "Name", "Rank", "Total Income", "Address"];

const teamTopHeaders = ["S.No", "Name", "Rank", "Total Income", "Address"];

const teamTopData = [
	{
		data: ["1", "Jane Cooper", "1", "₹ 47,890.00", "Katihar"],
		_id: 1,
	},
	{
		data: ["2", "Albert Flores", "2", "₹ 5,00,000.00", "Chhattisgarh"],
		_id: 2,
	},
	{
		data: ["3", "Eleanor Pena", "3", "₹ 78,000.00", "Meghalaya"],
		_id: 3,
	},
	{
		data: ["4", "Ralph Edwards", "4", "₹ 89,900.00", "HimachalPradesh"],
		_id: 4,
	},
	{
		data: ["5", "Courtney Henry", "5", "₹ 68,389.00", "Chandigarh"],
		_id: 5,
	},
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
	const { teams, loading } = useSelector((state) => state.team);
	const { user, users } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const [isAdmin, setIsAdmin] = useState("user");
	const [teamOptions, setTeamOptions] = useState({});
	const [defaultValue, setDefaultValue] = useState({});
	const [team, setTeam] = useState([]);
	const [topPerformer, setTopPerformer] = useState([]);

	// Memoize the mapped performers to avoid unnecessary re-renders
	const memoizedPerformers = useMemo(() => {
		return topPerformer.map((top) => (
			<div key={top._id} className="singlePerformer">
				<div className="performer-image">
					<div className="name">
						<p>{top.name}</p>
						<p>{top.rank}</p>
					</div>
				</div>
				<div className="price">{top?.referralIncome}</div>
			</div>
		));
	}, [topPerformer]);

	const hamdleTeamSelect = (selectedValue) => {
		dispatch(getTeam(selectedValue.value));
	};

	useEffect(() => {
		dispatch(getTeam());
	}, []);

	useEffect(() => {
		if (teams) {
			// console.log(teams);
			const sortedTeams = [...teams].sort((a, b) => b.referralIncome - a.referralIncome);
			const topPerformers = sortedTeams.slice(0, 4);
			const topData = topPerformers.map((top) => ({
				_id: top._id,
				name: top.firstName + " " + top.lastName,
				rank: top.rank,
				referralIncome: top.referralIncome,
			}));
			// console.log(topData);
			setTopPerformer(topData);
			const data = sortedTeams.map((member, idx) => {
				return {
					data: [idx + 1, member.firstName + " " + member.lastName, levelMap[member.level], member.referralIncome, member.state],
					_id: member._id,
				};
			});
			setTeam(data);
		}
	}, [teams]);

	useEffect(() => {
		if (users) {
			// console.log(users);
			const data = users.map((user) => {
				return {
					value: user._id,
					label: user.firstName + " " + user.lastName,
				};
			});
			setTeamOptions(data.reverse());
		}
	}, [users]);

	useEffect(() => {
		if (user) {
			if (user.role === "admin") {
				setIsAdmin("admin");
			}
			const data = {
				value: user._id,
				label: user.firstName + " " + user.lastName,
			};
			setDefaultValue(data);
		}
	}, [user]);

	useEffect(() => {
		if (topPerformer) {
			console.log(topPerformer);
		}
	}, [topPerformer]);

	return (
		<div className="admin-container">
			<AdminSidebar />
			<main className="dashboard">
				<Bar heading="Team" />
				<section className="team">
					{isAdmin === "admin" && (
						<div className="team__header">
							<Select
								styles={customStyles}
								components={{ DropdownIndicator }}
								options={teamOptions}
								defaultValue={defaultValue}
								onChange={hamdleTeamSelect}
							/>
							{/* <button className="btn btn-primary">Add New</button> */}
						</div>
					)}
					<div className="team__table">
						<TableContainer className="TeamTableContainer">
							<TableHeading>
								<p>Group Rising Stars </p>
							</TableHeading>
							{isAdmin === "admin" ? (
								<Table>
									<TableHeaders
										headers={teamGroupHeaders}
										style={{
											gridTemplateColumns: `repeat(${teamGroupHeaders.length},1fr)`,
											backgroundColor: "#CACACB",
										}}
									/>
									{loading && <TextLoader />}
									{!loading && <TableBody TableRow={OwnerRow} data={team} />}
								</Table>
							) : (
								<Table>
									<TableHeaders
										headers={teamTopHeaders}
										style={{
											gridTemplateColumns: `repeat(${teamTopData.length},1fr)`,
											backgroundColor: "#CACACB",
										}}
									/>
									<TableBody TableRow={OwnerRow} data={team} />
								</Table>
							)}
						</TableContainer>
					</div>
					<div className="team__footer">
						<div className="top_performer">
							<div className="heading">Top Performers</div>
							<div className="table-performer">{loading ? <TextLoader /> : memoizedPerformers}</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
};

export default Profile;
