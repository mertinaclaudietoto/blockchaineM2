import { Accueil } from "../pages/Accueil";
import { createBrowserRouter } from "react-router-dom";
import { WalletLogin } from "../pages/WalletLogin";
import { NftMarketplaceProvider } from "../context/NftMarketplaceContext";
import { NftLayout } from "../pages/nft/NftLayout";
import { NftHome } from "../pages/nft/NftHome";
import { NftExplorer } from "../pages/nft/NftExplorer";
import { NftMint } from "../pages/nft/NftMint";
import { NftCollection } from "../pages/nft/NftCollection";
import { NftTokenDetail } from "../pages/nft/NftTokenDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <NftMarketplaceProvider>
        <Accueil />
      </NftMarketplaceProvider>
    ),
  },
  {
    path: "/login",
    element: <WalletLogin />,
  },
  {
    path: "/nft",
    element: (
      <NftMarketplaceProvider>
        <NftLayout />
      </NftMarketplaceProvider>
    ),
    children: [
      { index: true, element: <NftHome /> },
      { path: "explorer", element: <NftExplorer /> },
      { path: "mint", element: <NftMint /> },
      { path: "collection", element: <NftCollection /> },
      { path: "token/:tokenId", element: <NftTokenDetail /> },
    ],
  },
]);
