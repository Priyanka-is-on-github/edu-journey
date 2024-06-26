import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { Toaster } from "react-hot-toast";
import { ConfettiProvider } from "./components/providers/confetti-provider";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ConfettiProvider/>
      <Toaster />
    </>
  );
}

export default App;
