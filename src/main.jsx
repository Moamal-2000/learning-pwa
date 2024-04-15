import ReactDOM from "react-dom/client";
import * as servicerWorker from "../public/register-pwa.js";
import App from "./App.jsx";
import "./Styles/main.css";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

servicerWorker.register();
