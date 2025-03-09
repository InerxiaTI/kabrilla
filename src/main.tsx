import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { NamespaceProvider } from "./ui/context/namespace/NameSpaceContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <NamespaceProvider>
      <App />
    </NamespaceProvider>
  </React.StrictMode>,
);
