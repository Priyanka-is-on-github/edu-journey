import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
// The exclamation mark (!) in ReactDOM.createRoot(document.getElementById('root')!) is a TypeScript non-null assertion operator. It is used to tell TypeScript that you are certain the expression before the ! is not null or undefined. This is necessary in TypeScript because document.getElementById returns HTMLElement | null, indicating that it might return null if the element with the specified ID is not found in the DOM.
