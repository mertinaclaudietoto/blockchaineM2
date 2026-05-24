// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/// @title Mini NFT Marketplace
/// @notice Permet de minter, lister et acheter des NFT ERC-721 avec paiement en ETH.
contract NFTMarketplace is ERC721URIStorage, Ownable, ReentrancyGuard {
    uint256 private _nextTokenId;

    /// @notice Informations d'un NFT listé à la vente.
    /// @param seller Adresse du vendeur.
    /// @param price Prix de vente en wei.
    /// @param active Indique si le listing est actif.
    struct Listing {
        address seller;
        uint256 price;
        bool active;
    }

    /// @notice Associe un tokenId à son listing.
    mapping(uint256 => Listing) public listings;

    /// @notice Initialise la collection ERC-721 du marketplace.
    constructor() ERC721("Mini Marketplace NFT", "MMNFT") Ownable(msg.sender) {}

    event NFTMinted(uint256 indexed tokenId, address indexed owner, string tokenURI);

    event ItemListed(uint256 indexed tokenId, address indexed seller, uint256 price);

    event ItemSold(
        uint256 indexed tokenId,
        address indexed seller,
        address indexed buyer,
        uint256 price
    );

    /// @notice Crée un nouveau NFT pour l'appelant.
    /// @param tokenURI URI des métadonnées du NFT.
    /// @return tokenId Identifiant du NFT créé.
    function mintNFT(string memory tokenURI) external returns (uint256) {
        require(bytes(tokenURI).length > 0, "Token URI is required");

        _nextTokenId++;
        uint256 tokenId = _nextTokenId;

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);

        emit NFTMinted(tokenId, msg.sender, tokenURI);

        return tokenId;
    }

    /// @notice Met un NFT possédé par l'appelant en vente.
    /// @param tokenId Identifiant du NFT à lister.
    /// @param price Prix de vente en wei.
    function listItem(uint256 tokenId, uint256 price) external {
        require(ownerOf(tokenId) == msg.sender, "Only owner can list item");
        require(price > 0, "Price must be greater than zero");

        listings[tokenId] = Listing({
            seller: msg.sender,
            price: price,
            active: true
        });

        emit ItemListed(tokenId, msg.sender, price);
    }

    /// @notice Achète un NFT listé et transfère l'ETH au vendeur.
    /// @dev Suit le pattern Checks-Effects-Interactions et rembourse le surplus éventuel.
    /// @param tokenId Identifiant du NFT à acheter.
    function buyItem(uint256 tokenId) external payable nonReentrant {
        Listing storage listing = listings[tokenId];

        require(listing.active, "Item is not listed");
        require(msg.value >= listing.price, "Insufficient payment");
        require(msg.sender != listing.seller, "Seller cannot buy own item");

        address seller = listing.seller;
        uint256 price = listing.price;

        listing.active = false;

        _transfer(seller, msg.sender, tokenId);

        (bool success, ) = payable(seller).call{value: price}("");
        require(success, "Payment transfer failed");

        if (msg.value > price) {
            (bool refundSuccess, ) = payable(msg.sender).call{
                value: msg.value - price
            }("");
            require(refundSuccess, "Refund failed");
        }

        emit ItemSold(tokenId, seller, msg.sender, price);
    }
}