import { useSelector } from "react-redux";

function Bar({ heading }) {
	const { user } = useSelector((state) => state.user);

	return (
		<div className="bar">
			<h1>{heading}</h1>
			<article>
				<img src={user?.avatar} alt="user image" />
				<div>
					<h5>{user?.firstName + " " + user?.lastName}</h5>
					<p>{user?.role}</p>
				</div>
			</article>
		</div>
	);
}

export default Bar;
