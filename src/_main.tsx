import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import AuthProvider from "@app/providers/AuthProvider";
import CaslProvider from "@app/providers/CaslProvider";

const rootElement = document.getElementById("root");
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <AuthProvider>
            <CaslProvider>
                <App/>
            </CaslProvider>
        </AuthProvider>
    );
}
