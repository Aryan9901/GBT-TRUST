import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Suspense, lazy, useEffect } from "react";
import Loader from "./components/Loader";
import { Bounce, ToastContainer, toast } from "react-toastify";
import SignIn from "./pages/Signin";
import { useDispatch, useSelector } from "react-redux";
import { generateReferalLink, getActiveUsers, getAllUsers, loadUser } from "./redux/actions/index";
import Cookies from "js-cookie";
import TransferAccept from "./components/TransferAccept.jsx";
// ** pages lazy import()

const SignUp = lazy(() => import("./pages/Signup"));
const Forgot = lazy(() => import("./pages/Forgot"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const Team = lazy(() => import("./pages/Team"));
const CreateRequest = lazy(() => import("./pages/CreateRequest"));
const Refers = lazy(() => import("./pages/Refers"));
const OurProgram = lazy(() => import("./pages/OurProgram"));
const Epin = lazy(() => import("./pages/EPin"));
const BankTransfer = lazy(() => import("./pages/BankTransfer"));
const TreeComponent = lazy(() => import("./pages/TreeComponent"));
const Kyc = lazy(() => import("./pages/Kyc"));
const Statements = lazy(() => import("./pages/Statements"));
const Payment = lazy(() => import("./pages/Payment"));
const ProtectedRoute = lazy(() => import("./ProtectedRoutes/ProtectedRoute.jsx"));
const Bonus = lazy(() => import("./pages/Bonus.jsx"));

const App = () => {
	const dispatch = useDispatch();
	const { message, error } = useSelector((state) => state.user);

	useEffect(() => {
		const token = Cookies.get("token");
		if (token) {
			dispatch(loadUser());
			// dispatch(generateReferal());
			dispatch(getAllUsers());
			dispatch(getActiveUsers());
			dispatch(generateReferalLink());
		}
	}, []);

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
		<Suspense fallback={<Loader />}>
			<Routes>
				<Route path="/" element={<SignIn />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/reset/:resetToken" element={<Forgot />} />
				<Route element={<ProtectedRoute />}>
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/payment" element={<Payment />} />
					<Route path="/team" element={<Team />} />
					<Route path="/program" element={<OurProgram />} />
					<Route path="/request" element={<CreateRequest />} />
					<Route path="/request/bonus" element={<Bonus />} />
					<Route path="/refers" element={<Refers />} />
					<Route path="/tree" element={<TreeComponent />} />
					<Route path="/epin" element={<Epin />} />
					<Route path="/bank/transfer" element={<BankTransfer />} />
					<Route path="/statements" element={<Statements />} />
					<Route path="/transfer/accept/:id" element={<TransferAccept />} />
					<Route path="/kyc" element={<Kyc />} />
				</Route>
				<Route path="*" element={<h2>Page Not Found</h2>} />
			</Routes>
			<ToastContainer
				position="bottom-center"
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
				transition={Bounce}
			/>
		</Suspense>
	);
};

export default App;
