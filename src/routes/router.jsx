import { Accueil } from "../pages/Accueil";
import { createBrowserRouter } from "react-router-dom";
import { WalletLogin } from "../pages/WalletLogin";
// , Navigate
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Accueil/>,
  },
  {
    path: "/login",
    element: <WalletLogin/>,
  },

]);