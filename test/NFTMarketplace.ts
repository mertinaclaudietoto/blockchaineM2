import { expect } from "chai";
import { network } from "hardhat";
const { ethers } = await network.create();
describe("NFTMarketplace", function () {
  it("should mint an NFT with a token URI", async function () {
    const [owner] = await ethers.getSigners();
    const marketplace = await ethers.deployContract("NFTMarketplace");
    const tokenURI = "ipfs://metadata-1";
    await marketplace.mintNFT(tokenURI);
    expect(await marketplace.ownerOf(1)).to.equal(owner.address);
    expect(await marketplace.tokenURI(1)).to.equal(tokenURI);
  });
  it("should reject minting with an empty token URI", async function () {
    const marketplace = await ethers.deployContract("NFTMarketplace");
    await expect(marketplace.mintNFT("")).to.be.revertedWith(
      "Token URI is required",
    );
  });

  it("should reject listing with a zero price", async function () {
    const marketplace = await ethers.deployContract("NFTMarketplace");
  
    await marketplace.mintNFT("ipfs://metadata-1");
  
    await expect(marketplace.listItem(1, 0)).to.be.revertedWith(
      "Price must be greater than zero",
    );
  });
  it("should reject listing by a non-owner", async function () {
    const [, buyer] = await ethers.getSigners();
  
    const marketplace = await ethers.deployContract("NFTMarketplace");
  
    await marketplace.mintNFT("ipfs://metadata-1");
  
    const price = ethers.parseEther("0.01");
  
    await expect(marketplace.connect(buyer).listItem(1, price)).to.be.revertedWith(
      "Only owner can list item",
    );
  });
  it("should list an owned NFT for sale", async function () {
    const [owner] = await ethers.getSigners();
  
    const marketplace = await ethers.deployContract("NFTMarketplace");
  
    const tokenURI = "ipfs://metadata-1";
    await marketplace.mintNFT(tokenURI);
  
    const price = ethers.parseEther("0.01");
  
    await expect(marketplace.listItem(1, price))
      .to.emit(marketplace, "ItemListed")
      .withArgs(1, owner.address, price);
  
    const listing = await marketplace.listings(1);
  
    expect(listing.seller).to.equal(owner.address);
    expect(listing.price).to.equal(price);
    expect(listing.active).to.equal(true);
  });
  it("should reject buying an NFT that is not listed", async function () {
    const [, buyer] = await ethers.getSigners();

    const marketplace = await ethers.deployContract("NFTMarketplace");

    await marketplace.mintNFT("ipfs://metadata-1");

    const price = ethers.parseEther("0.01");

    await expect(
      marketplace.connect(buyer).buyItem(1, { value: price }),
    ).to.be.revertedWith("Item is not listed");
  });
  it("should reject buying with insufficient payment", async function () {
    const [, buyer] = await ethers.getSigners();

    const marketplace = await ethers.deployContract("NFTMarketplace");

    await marketplace.mintNFT("ipfs://metadata-1");

    const price = ethers.parseEther("0.01");
    await marketplace.listItem(1, price);

    await expect(
      marketplace.connect(buyer).buyItem(1, { value: ethers.parseEther("0.005") }),
    ).to.be.revertedWith("Insufficient payment");
  });
  it("should reject seller buying their own NFT", async function () {
    const marketplace = await ethers.deployContract("NFTMarketplace");

    await marketplace.mintNFT("ipfs://metadata-1");

    const price = ethers.parseEther("0.01");
    await marketplace.listItem(1, price);

    await expect(
      marketplace.buyItem(1, { value: price }),
    ).to.be.revertedWith("Seller cannot buy own item");
  });
  it("should allow a buyer to buy a listed NFT", async function () {
  const [seller, buyer] = await ethers.getSigners();

  const marketplace = await ethers.deployContract("NFTMarketplace");

  await marketplace.mintNFT("ipfs://metadata-1");

  const tokenId = 1;
  const price = ethers.parseEther("0.01");

  await marketplace.listItem(tokenId, price);

  const sellerBalanceBefore = await ethers.provider.getBalance(seller.address);

  await expect(
    marketplace.connect(buyer).buyItem(tokenId, { value: price }),
  )
    .to.emit(marketplace, "ItemSold")
    .withArgs(tokenId, seller.address, buyer.address, price);

  expect(await marketplace.ownerOf(tokenId)).to.equal(buyer.address);

  const listing = await marketplace.listings(tokenId);
  expect(listing.active).to.equal(false);

  const sellerBalanceAfter = await ethers.provider.getBalance(seller.address);
  expect(sellerBalanceAfter - sellerBalanceBefore).to.equal(price);
});
});