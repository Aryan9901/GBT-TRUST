import { useLocation } from "react-router-dom";
import { AdminSidebar, Bar } from "../components";
import { AwardTransfer } from "../components/Transfer";

const Bonus = () => {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const data = JSON.parse(searchParams.get("data"));

	return (
		<div className="admin-container">
			<AdminSidebar />
			<main className="bonus">
				<Bar heading="Dashboard" />
				<h2>Request Amount</h2>
				<AwardTransfer data={data} />
			</main>
		</div>
	);
};

export default Bonus;
