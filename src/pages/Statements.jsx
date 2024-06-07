import { AdminSidebar, Bar } from "../components";
import { useEffect, useState } from "react";
import { Table, TableBody, TableContainer, TableHeaders, TableHeading, StatementRow } from "../components/TableHOC";
import { useDispatch, useSelector } from "react-redux";
import { getAllStatements } from "../redux/actions/statement.action";
import Select, { components } from "react-select";
import { CUSTOME_STYLES } from "../assets/data/constants";
import { FaSort } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const customerHeaders = ["S no", "Details", "Amount", "Transaction", "Date"];

const DropdownIndicator = (props) => {
	return (
		<components.DropdownIndicator {...props}>
			<FaSort />
		</components.DropdownIndicator>
	);
};

function formatDate(date) {
	// Ensure date is in the correct format
	if (!(date instanceof Date)) {
		date = new Date(date);
	}

	// Array of month names
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	// Get components of the date
	const year = date.getFullYear();
	const month = date.getMonth();
	const day = date.getDate();

	// Format the date
	const formattedDate = `${day}, ${months[month]}, ${year}`;

	return formattedDate;
}

function formatMonth(date) {
	// Ensure date is in the correct format
	if (!(date instanceof Date)) {
		date = new Date(date);
	}

	// Array of month names
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	// Get components of the date
	const month = date.getMonth();

	// Format the date
	const formattedDate = `${months[month]}`;

	return formattedDate;
}

const Statements = () => {
	const [adminData, setAdminData] = useState([]);
	const [debitedStatement, setDebitedStatement] = useState([]);
	const [month, setMonth] = useState("");
	const [monthOptions, setMonthOptions] = useState([]);
	const { user } = useSelector((state) => state.user);
	const { statements } = useSelector((state) => state.statement);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const processData = (data) => {
		console.log(data.statement.transfer);
		navigate(`/transfer/accept/${data.statement.transfer._id}`);
	};

	useEffect(() => {
		// const total = dummyData.reduce((acc, curr) => acc + curr, 0);
		if (statements && statements?.length > 0) {
			console.log(statements);
			const filteredData = statements.filter((st) => st.type === "debited");
			const creditData = statements.map((st, idx) => {
				return {
					data: [statements.length - idx, st.details, st.amount, st.type, formatDate(st.createdAt)],
					statement: st,
					_id: st._id,
				};
			});
			const debitedData = filteredData.map((st, idx) => {
				return {
					data: [filteredData.length - idx, st.details, st.amount, "credited", formatDate(st.createdAt)],
					statement: st,
					_id: st._id,
				};
			});
			const dateSet = new Set(creditData.map((transfer) => formatMonth(new Date(transfer.data[4]).toLocaleDateString())));

			const uniqueDateArray = Array.from(dateSet)
				.map((date) => ({
					label: date,
					value: date,
				}))
				.reverse();

			setMonth(uniqueDateArray[0].value);
			setMonthOptions(uniqueDateArray);
			setDebitedStatement(debitedData);
			setAdminData(creditData);
		}
	}, [statements]);

	useEffect(() => {
		dispatch(getAllStatements());
	}, []);

	return (
		<div className="admin-container">
			<AdminSidebar />
			<main className="dashboard">
				<Bar heading="Statements" />
				<section className="statements">
					<TableContainer className="statement-table">
						<TableHeading>
							<p>Statements</p>
							<Select
								defaultValue={monthOptions[0]}
								options={monthOptions}
								components={{ DropdownIndicator }}
								value={{ label: month, value: month }}
								styles={CUSTOME_STYLES}
								onChange={(e) => setMonth(e.value)}
							/>
						</TableHeading>
						<Table>
							<TableHeaders
								style={{
									gridTemplateColumns: `repeat(${customerHeaders.length},1fr)`,
								}}
								headers={customerHeaders}
							/>
							{user && user.role === "admin" && (
								<TableBody
									TableRow={StatementRow}
									onClick={processData}
									data={month ? adminData.filter((i) => formatMonth(i.data[4]) === month) : adminData.reverse()}
								/>
							)}
							{user && user.role === "user" && (
								<TableBody
									TableRow={StatementRow}
									data={month ? debitedStatement.filter((i) => formatMonth(i.data[4]) === month) : debitedStatement.reverse()}
								/>
							)}
						</Table>
					</TableContainer>
				</section>
			</main>
		</div>
	);
};

export default Statements;
