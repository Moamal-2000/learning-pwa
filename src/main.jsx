import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import * as serviceWorker from "./Functions/pwa/register-pwa.js";
import "./Styles/main.css";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

serviceWorker.register();
