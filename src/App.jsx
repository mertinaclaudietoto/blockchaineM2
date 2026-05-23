import "./App.css";
import { RouterProvider } from "react-router-dom";
import { WalletProvider } from "./context/WalletContext";
import { router } from "./routes/router";

function App() {
  return (
    <WalletProvider>
      <RouterProvider router={router} />
    </WalletProvider>
  );
}

export default App;