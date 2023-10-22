const { expect } = require("chai");

describe("MeteoriteNFT", function () {
    let MeteoriteNFT;
    let meteoriteNFT;
    let owner;
    let addr1;
    let addr2;
    let addrs;

    beforeEach(async function () {
        MeteoriteNFT = await ethers.getContractFactory("MeteoriteNFT");
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

        meteoriteNFT = await MeteoriteNFT.deploy();
    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await meteoriteNFT.owner()).to.equal(owner.address);
        });

        it("Should not be active for minting by default", async function () {
            expect(await meteoriteNFT.mintActive()).to.equal(false);
        });
    });

    describe("Minting", function () {
        it("Should revert if trying to mint when minting is paused", async function () {
            await expect(meteoriteNFT.safeMint()).to.be.revertedWith("Minting paused");
        });

        it("Should mint if minting is activated", async function () {
            await meteoriteNFT.setMintState(true);
            await meteoriteNFT.safeMint();
            expect(await meteoriteNFT.ownerOf(0)).to.equal(owner.address);
        });

        it("Should increment token IDs", async function () {
            await meteoriteNFT.setMintState(true);
            await meteoriteNFT.safeMint();
            await meteoriteNFT.safeMint();

            expect(await meteoriteNFT.ownerOf(0)).to.equal(owner.address);
            expect(await meteoriteNFT.ownerOf(1)).to.equal(owner.address);
        });
    });

    describe("URI Management", function () {
        const testURI = "https://example.com/token/";

        it("Should return the correct token URI after it's set", async function () {
            await meteoriteNFT.setMintState(true);
            await meteoriteNFT.safeMint();
            await meteoriteNFT.setUri(testURI);
            expect(await meteoriteNFT.tokenURI(0)).to.equal(testURI);
        });
    });

 
});
