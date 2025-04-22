import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./hooks/use-auth";
import { Providers } from "./providers";

createRoot(document.getElementById("root")!).render(
  <Providers>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Providers>
);
