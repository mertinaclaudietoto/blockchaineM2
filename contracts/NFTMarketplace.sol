// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract NFTMarketplace is ERC721URIStorage, Ownable, ReentrancyGuard {
    uint256 private _nextTokenId;
    struct Listing {
        address seller;
        uint256 price;
        bool active;
    }
    mapping(uint256 => Listing) public listings;
    constructor() ERC721("Mini Marketplace NFT", "MMNFT") Ownable(msg.sender) {}

    event NFTMinted(uint256 indexed tokenId, address indexed owner, string tokenURI);

    event ItemListed(uint256 indexed tokenId, address indexed seller, uint256 price);

    event ItemSold(
        uint256 indexed tokenId,
        address indexed seller,
        address indexed buyer,
        uint256 price
    );

    function mintNFT(string memory tokenURI) external returns (uint256) {
        require(bytes(tokenURI).length > 0, "Token URI is required");

        _nextTokenId++;
        uint256 tokenId = _nextTokenId;

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);

        emit NFTMinted(tokenId, msg.sender, tokenURI);

        return tokenId;
    }

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

    // La fonction doit :

    //     Vérifier que le NFT est en vente.
    //     Vérifier que l’acheteur a envoyé assez d’ETH.
    //     Vérifier que l’acheteur n’est pas le vendeur.
    //     Désactiver le listing.
    //     Transférer le NFT à l’acheteur.
    //     Envoyer l’ETH au vendeur.
    //     Émettre un event.
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