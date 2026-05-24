import { Contract, Interface, formatEther, parseEther } from "ethers";
import { MARKETPLACE_ABI } from "./abi";
import { HAS_MARKETPLACE, MARKETPLACE_ADDRESS } from "./addresses";
import { MAX_TOKEN_SCAN } from "./config";
import { assertMarketplaceIsContract } from "./contractCheck";
import { getBrowserProvider } from "./wallet";

const PLACEHOLDER_IMAGE = "https://picsum.photos/seed/chain/480/480";

function assertMarketplaceConfigured() {
  if (!HAS_MARKETPLACE) {
    const err = new Error("NO_CONTRACT");
    throw err;
  }
}

export async function getSigner() {
  assertMarketplaceConfigured();
  const provider = getBrowserProvider();
  return provider.getSigner();
}

/** Contrat en lecture (provider). */
export async function getReadContract() {
  assertMarketplaceConfigured();
  const provider = getBrowserProvider();
  return new Contract(MARKETPLACE_ADDRESS, MARKETPLACE_ABI, provider);
}

/** Contrat signé pour les transactions. */
export async function getContract() {
  const signer = await getSigner();
  const userAddress = await signer.getAddress();
  await assertMarketplaceIsContract(MARKETPLACE_ADDRESS, userAddress);
  return new Contract(MARKETPLACE_ADDRESS, MARKETPLACE_ABI, signer);
}

async function resolveTokenMetadata(tokenURI) {
  const fallback = {
    name: "NFT",
    description: "",
    imageUrl: PLACEHOLDER_IMAGE,
  };

  if (!tokenURI) return fallback;

  let url = tokenURI;
  if (url.startsWith("data:application/json")) {
    try {
      const base64 = url.split(",")[1];
      const bytes = Uint8Array.from(atob(base64), (char) => char.charCodeAt(0));
      const json = JSON.parse(new TextDecoder().decode(bytes));
      let image = json.image ?? "";
      if (typeof image === "string" && image.startsWith("ipfs://")) {
        image = `https://ipfs.io/ipfs/${image.slice(7)}`;
      }
      return {
        name: json.name ?? fallback.name,
        description: json.description ?? "",
        imageUrl: image || PLACEHOLDER_IMAGE,
      };
    } catch {
      return fallback;
    }
  }

  if (url.startsWith("ipfs://")) {
    url = `https://ipfs.io/ipfs/${url.slice(7)}`;
  }

  if (/\.(png|jpe?g|gif|webp|svg)(\?|$)/i.test(url)) {
    return {
      name: fallback.name,
      description: "",
      imageUrl: url,
    };
  }

  if (!url.startsWith("http")) {
    return { ...fallback, description: tokenURI };
  }

  try {
    const res = await fetch(url);
    if (!res.ok) return fallback;
    const contentType = res.headers.get("content-type") ?? "";
    if (contentType.startsWith("image/")) {
      return {
        name: fallback.name,
        description: "",
        imageUrl: url,
      };
    }
    const json = await res.json();
    let image = json.image ?? json.image_url ?? "";
    if (typeof image === "string" && image.startsWith("ipfs://")) {
      image = `https://ipfs.io/ipfs/${image.slice(7)}`;
    }
    return {
      name: json.name ?? fallback.name,
      description: json.description ?? "",
      imageUrl: image || PLACEHOLDER_IMAGE,
    };
  } catch {
    return fallback;
  }
}

/**
 * Charge les NFT mintés + listings actifs depuis la chaîne.
 */
export async function fetchMarketplaceNfts(maxScan = MAX_TOKEN_SCAN) {
  const contract = await getReadContract();
  const nfts = [];

  for (let tokenId = 1; tokenId <= maxScan; tokenId++) {
    let owner;
    try {
      owner = await contract.ownerOf(tokenId);
    } catch {
      break;
    }

    const [listing, tokenURI] = await Promise.all([
      contract.listings(tokenId),
      contract.tokenURI(tokenId).catch(() => ""),
    ]);

    const meta = await resolveTokenMetadata(tokenURI);
    const priceWei = listing.price;
    const active = listing.active;

    nfts.push({
      tokenId,
      name: meta.name || `Token #${tokenId}`,
      description: meta.description,
      imageUrl: meta.imageUrl,
      creator: listing.seller !== "0x0000000000000000000000000000000000000000"
        ? listing.seller
        : owner,
      owner,
      listed: Boolean(active),
      priceEth: active ? Number(formatEther(priceWei)) : null,
      tokenURI,
    });
  }

  return nfts;
}

export async function fetchMarketplaceSalesStats() {
  const contract = await getReadContract();
  const events = await contract.queryFilter(contract.filters.ItemSold(), 0, "latest");
  let volumeWei = 0n;
  const buyers = new Set();
  const sellers = new Set();

  events.forEach((event) => {
    volumeWei += event.args.price;
    buyers.add(event.args.buyer.toLowerCase());
    sellers.add(event.args.seller.toLowerCase());
  });

  return {
    sales: events.length,
    volumeEth: Number(formatEther(volumeWei)),
    participants: new Set([...buyers, ...sellers]).size,
  };
}

export async function buyItem(tokenId) {
  const contract = await getContract();
  const listing = await contract.listings(tokenId);
  if (!listing.active) {
    const err = new Error("NOT_LISTED");
    throw err;
  }
  const tx = await contract.buyItem(tokenId, { value: listing.price });
  const receipt = await tx.wait();
  return receipt.hash;
}

export async function listItem(tokenId, priceEth) {
  const contract = await getContract();
  const priceWei = parseEther(String(priceEth));
  const tx = await contract.listItem(tokenId, priceWei);
  const receipt = await tx.wait();
  return receipt.hash;
}

export async function mintNft(tokenURI) {
  const contract = await getContract();
  const tx = await contract.mintNFT(tokenURI);
  const receipt = await tx.wait();
  const iface = new Interface(MARKETPLACE_ABI);
  for (const log of receipt.logs) {
    try {
      const parsed = iface.parseLog(log);
      if (parsed?.name === "NFTMinted") {
        return { hash: receipt.hash, tokenId: Number(parsed.args.tokenId) };
      }
    } catch {
      /* log non marketplace */
    }
  }
  return { hash: receipt.hash, tokenId: null };
}

export { MARKETPLACE_ADDRESS, HAS_MARKETPLACE, formatEther, parseEther };
