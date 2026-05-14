import { Accueil } from "../pages/Accueil";
import { createBrowserRouter } from "react-router-dom";
// , Navigate
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Accueil/>,
  },

]);