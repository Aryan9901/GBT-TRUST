import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/app.scss";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<Provider store={store}>
			<ChakraProvider resetCSS={false}>
				<App />
			</ChakraProvider>
		</Provider>
	</BrowserRouter>
);
