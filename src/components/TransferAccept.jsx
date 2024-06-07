import { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { Bar, Loader } from "./";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleTransfer } from "../redux/actions/index";
import { toast } from "react-toastify";
import axios from "axios";
import { processAwardRequest, processTransferRequest } from "../redux/actions/transfer.action";

const TransferAccept = () => {
	const { transfer, message, error, loading } = useSelector((state) => state.transfer);
	const [data, setData] = useState({});
	const params = useParams();
	const dispatch = useDispatch();
	const [qrUrl, setQrUrl] = useState("");

	const paymentRequest = (action) => {
		if (data.type === "cash") {
			const transactionid = prompt("Enter transaction id");
			if (transactionid) {
				const process = { transferId: data.transferId, action, amount: data.amount, transactionId: transactionid };
				dispatch(processTransferRequest(process));
			} else {
				toast.info("transaction id is required");
			}
		} else if (data.type === "award") {
			console.log(data.type);
			const transactionid = prompt("Enter transaction id");
			if (transactionid) {
				const process = { transferId: data.transferId, action, amount: data.amount, award: data.award, transactionId: transactionid };
				dispatch(processAwardRequest(process));
			} else {
				toast.info("transaction id is required");
			}
		}
	};
	// const processRequest = (action) => {
	// 	const transactionid = prompt("Enter transaction id");
	// 	if (transactionid) {
	// 		if (data.type === "cash") {
	// 			const process = { transferId: data.transferId, action, amount: data.amount, transactionId: transactionid };
	// 			dispatch(processRequest(process));
	// 		} else {
	// 			const process = { transferId: data.transferId, action, amount: data.amount, award: data.award, transactionId: transactionid };
	// 			dispatch(processAwardRequest(process));
	// 		}
	// 	} else {
	// 		toast.info("transaction id is required");
	// 	}
	// };

	useEffect(() => {
		dispatch(getSingleTransfer(params.id));
	}, [dispatch, params.id]);

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

	useEffect(() => {
		const getQrCode = async (url) => {
			if (transfer) {
				try {
					const response = await axios.get(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${url}`);
					setQrUrl(response.request.responseURL);
				} catch (error) {
					console.error("Error fetching QR code:", error);
				}
			}
		};

		if (transfer) {
			const { transferdata, bank } = transfer;
			console.log(transferdata);
			let data;
			if (transferdata.type === "cash") {
				data = {
					name: `${transferdata.user.firstName} ${transferdata.user.lastName}`,
					amount: transferdata.amount,
					date: new Date(transferdata.createdAt).toLocaleDateString(),
					status: transferdata.status,
					accountNumber: bank.accountNumber,
					accountHolderName: bank.accountHolderName,
					accountType: bank.accountType,
					bankName: bank.bankName,
					ifscCode: bank.ifscCode,
					upi: transferdata.upi,
					phone: transferdata.user.contact,
					email: transferdata.user.email,
					transferId: transferdata._id,
					purpose: transferdata.purpose,
					type: transferdata.type,
				};
			} else {
				data = {
					name: `${transferdata?.user?.firstName} ${transferdata?.user?.lastName}`,
					address: transferdata?.address || `${transferdata?.user?.city} ${transferdata?.user?.state} ${transferdata?.user?.postalCode}`,
					amount: transferdata?.amount,
					award: transferdata?.award,
					date: new Date(transferdata.createdAt).toLocaleDateString(),
					status: transferdata.status,
					accountNumber: bank.accountNumber,
					accountHolderName: bank.accountHolderName,
					accountType: bank.accountType,
					bankName: bank.bankName,
					ifscCode: bank.ifscCode,
					upi: transferdata.upi,
					phone: transferdata.user.contact,
					email: transferdata.user.email,
					transferId: transferdata._id,
					purpose: transferdata.purpose,
					type: transferdata.type,
				};
			}
			console.log(data);
			setData(data);
			const uurl = `upi://pay?pa=${data.upi}&pn=GBT&am=100&cu=INR`;
			getQrCode(uurl);
		}
	}, [transfer]);

	if (loading) {
		return <Loader />;
	}

	return (
		<div className="admin-container">
			<AdminSidebar />
			<main className="transferAccept">
				<Bar />
				<h2>Transfer Request</h2>
				<div className="flexDiv">
					<div className="query">
						<h3>Any Query Call</h3>
						<h5>+91 {data.phone}</h5>
						<h6>Email @</h6>
						<p>{data.email}</p>
						<h6>Address @</h6>
						<p>{data.address}</p>
						<h6>Purpose</h6>
						<p>{data.purpose}</p>
					</div>
					<div className="paymentDetails">
						<div className="left">{qrUrl && <img src={qrUrl} alt="QR Code" />}</div>
						<div className="right">
							<h3>Payment Details</h3>
							<h5>Name: {data.name}</h5>
							<h5>Amount: {data.amount}</h5>
							<h5>Award: {data.award}</h5>
							<h5>Date: {data.date}</h5>
							<h5>UPI ID: {data.upi}</h5>
							<h5>Account Number: {data.accountNumber}</h5>
							<h5>Account Holder Name: {data.accountHolderName}</h5>
							<h5>Account Type: {data.accountType}</h5>
							<h5>Bank Name: {data.bankName}</h5>
							<h5>IFSC Code: {data.ifscCode}</h5>
							<h5 className={data.status === "pending" ? "purple" : data.status === "accepted" ? "green" : "red"}>
								Status: {data.status}
							</h5>
							{data.status === "pending" && (
								<div className="buttonsConf">
									<button onClick={() => paymentRequest(true)}>Accept</button>
									<button onClick={() => paymentRequest(false)}>Reject</button>
								</div>
							)}
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default TransferAccept;
