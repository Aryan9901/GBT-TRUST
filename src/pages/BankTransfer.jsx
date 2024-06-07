/* eslint-disable react/prop-types */

import AdminSidebar from "../components/AdminSidebar";
import {
	Bar,
	TableBody,
	Table,
	TableContainer,
	TableHeaders,
	TableHeading,
	UserTransactionRow,
	AdminTransactionRow,
	Transfer,
	Loader,
} from "../components";
import Select, { components } from "react-select";
import { FaRupeeSign, FaWallet, FaSort } from "react-icons/fa";
import { CUSTOME_STYLES } from "../assets/data/constants";
import { RiBankFill } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";
import { awardTransferHeaders, bankTransferHeaders } from "../assets/data/owner";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTransferRequest, getTransferRequestById, getBankDetails } from "../redux/actions/index";
import { calculateReferral } from "../redux/actions/user.action";
import { toast } from "react-toastify";

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

function BankTransfer() {
	const { user } = useSelector((state) => state.user);
	const { message, error, loading, referralAmount } = useSelector((state) => state.update);
	const { transfers, allTransfers } = useSelector((state) => state.transfer);
	const [transferRequests, setTransferRequests] = useState([]);
	const [month, setMonth] = useState("");
	const [awardMonth, setAwardMonth] = useState("");
	const [monthOptions, setMonthOptions] = useState([]);
	const [awardMonthOptions, setAwardMonthOptions] = useState([]);
	const [alltransferRequests, setAllTransferRequests] = useState([]);
	const [awardtransferRequests, setAwardTransferRequests] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		if (transfers) {
			const data = transfers.map((transfer) => {
				return {
					data: [
						transfer.transferId,
						transfer.user.firstName + " " + transfer.user.lastName,
						transfer.amount,
						formatDate(new Date(transfer.createdAt).toLocaleDateString()),
					],
					status: transfer.status,
				};
			});
			setTransferRequests(data);
		}
	}, [transfers, isOpen]);

	useEffect(() => {
		if (allTransfers) {
			const data = allTransfers
				.map((transfer) => {
					return {
						data: [
							transfer.transferId,
							transfer.user.firstName + " " + transfer.user.lastName,
							transfer.amount,
							formatDate(new Date(transfer.createdAt).toLocaleDateString()),
						],
						status: transfer.status,
						type: transfer.type,
						_id: transfer._id,
					};
				})
				.filter((i) => i.type === "cash");
			const dateSet = new Set(data.map((transfer) => formatMonth(new Date(transfer.data[3]).toLocaleDateString())));

			const uniqueDateArray = Array.from(dateSet)
				.map((date) => ({
					label: date,
					value: date,
				}))
				.reverse();

			const awardData = allTransfers
				.map((item) => {
					return {
						data: [
							item?.transferId,
							item?.user.firstName + " " + item?.user?.lastName,
							item?.amount,
							item?.award,
							formatDate(new Date(item?.createdAt)?.toLocaleDateString()),
						],
						status: item?.status,
						type: item?.type,
						_id: item?._id,
					};
				})
				.filter((i) => i.type === "award");

			const awardDateSet = new Set(awardData.map((transfer) => formatMonth(new Date(transfer.data[4]).toLocaleDateString())));

			const awardDateArray = Array.from(awardDateSet)
				.map((date) => ({
					label: date,
					value: date,
				}))
				.reverse();

			setMonth(uniqueDateArray[0].value);
			setAwardMonth(awardDateArray[0].value);
			setAwardMonthOptions(awardDateArray);
			setMonthOptions(uniqueDateArray);
			setAwardTransferRequests(awardData);
			setAllTransferRequests(data);
		}
	}, [allTransfers]);

	useEffect(() => {
		if (user) {
			dispatch(getBankDetails(user._id));
			dispatch(getTransferRequestById());
			dispatch(getAllTransferRequest());
			dispatch(calculateReferral(user._id));
		}
	}, [dispatch, user]);

	useEffect(() => {
		dispatch(getTransferRequestById());
		dispatch(getAllTransferRequest());
	}, []);

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

	if (loading) {
		return <Loader />;
	}

	return (
		<div className="admin-container">
			<AdminSidebar />
			<main className="bankTransfer">
				<Bar heading="Transfer" />
				{user?.role === "user" && (
					<div className="cardWidget">
						<CardWidget heading="Total Balance" value={referralAmount ? referralAmount - user.amountWithdrawn : 0} Icon={FaRupeeSign} />
						<CardWidget heading="Deposits" value={0} Icon={FaRupeeSign} />
						<CardWidget style={{ backgroundColor: "#003D79" }} heading="Transfer Amount" Icon={RiBankFill} />
					</div>
				)}
				{user?.role === "user" ? (
					<div className="wallet-pin-container">
						<section className="my-wallet">
							<div className="wallet-header">
								<FaWallet />
								<h1>My Wallet</h1>
								<BsThreeDots />
							</div>
							<div className="wallet-amount">
								<h1> ₹ {referralAmount ? referralAmount - user?.amountWithdrawn : 0}</h1>
							</div>

							<div className="wallet-buttons">
								<button className="btn btn-primary" onClick={() => setIsOpen(true)}>
									Withdrawal
								</button>
							</div>
						</section>
						<TableContainer className="withdrawalrequesttable">
							<TableHeading>
								<p>Transaction Details</p>
							</TableHeading>
							<Table>
								<TableHeaders
									style={{
										gridTemplateColumns: `repeat(${bankTransferHeaders.length},1fr)`,
									}}
									headers={bankTransferHeaders}
								/>
								<TableBody TableRow={UserTransactionRow} data={transferRequests.filter((i) => i.status === "pending").reverse()} />
							</Table>
						</TableContainer>
					</div>
				) : null}

				{user?.role === "user" ? <Transfer availableAmount={referralAmount} isOpen={isOpen} setIsOpen={setIsOpen} /> : null}

				{user?.role === "user" && (
					<TableContainer className="transactiondetailstable">
						<TableHeading>
							<p>Transaction Details</p>
						</TableHeading>
						<Table>
							<TableHeaders
								style={{
									gridTemplateColumns: `repeat(${bankTransferHeaders.length},1fr)`,
								}}
								headers={bankTransferHeaders}
							/>
							<TableBody
								TableRow={UserTransactionRow}
								data={transferRequests.filter((i) => i.status === "rejected" || i.status === "accepted")?.reverse()}
							/>
						</Table>
					</TableContainer>
				)}
				{user?.role === "admin" ? (
					<>
						<TableContainer>
							<TableHeading>
								<p>Transfer Requests</p>
								<Select
									defaultValue={monthOptions[0]}
									options={monthOptions}
									components={{ DropdownIndicator }}
									styles={CUSTOME_STYLES}
									value={{ label: month, value: month }}
									onChange={(e) => setMonth(e.value)}
								/>
							</TableHeading>
							<Table>
								<TableHeaders
									style={{
										gridTemplateColumns: `repeat(${bankTransferHeaders.length},1fr)`,
									}}
									headers={bankTransferHeaders}
								/>
								<TableBody
									TableRow={AdminTransactionRow}
									data={month ? alltransferRequests.filter((i) => formatMonth(i.data[3]) === month) : alltransferRequests}
								/>
							</Table>
						</TableContainer>
						<TableContainer>
							<TableHeading>
								<p>Level Bonus Requests</p>
								<Select
									defaultValue={awardMonthOptions[0]}
									options={awardMonthOptions}
									components={{ DropdownIndicator }}
									value={{ label: awardMonth, value: awardMonth }}
									styles={CUSTOME_STYLES}
									onChange={(e) => setAwardMonth(e.value)}
								/>
							</TableHeading>
							<Table>
								<TableHeaders
									style={{
										gridTemplateColumns: `repeat(${awardTransferHeaders.length},1fr)`,
									}}
									headers={awardTransferHeaders}
								/>
								<TableBody
									TableRow={AdminTransactionRow}
									data={
										awardMonth
											? awardtransferRequests.filter((i) => formatMonth(i.data[4]) === awardMonth)
											: awardtransferRequests
									}
								/>
							</Table>
						</TableContainer>
					</>
				) : null}
			</main>
		</div>
	);
}

export default BankTransfer;

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
