const { expect } = require("chai");

describe("MeteoriteToken", function () {
    let MeteoriteToken;
    let meteoriteToken;
    let owner;
    let addr1;
    let addr2;
    let addrs;

    beforeEach(async function () {
        MeteoriteToken = await ethers.getContractFactory("MeteoriteToken");
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

        meteoriteToken = await MeteoriteToken.deploy();
    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await meteoriteToken.owner()).to.equal(owner.address);
        });

        it("Should have correct name and symbol", async function () {
            expect(await meteoriteToken.name()).to.equal("Meteorite");
            expect(await meteoriteToken.symbol()).to.equal("MTO");
        });
    });


    describe("Ownership", function () {
        it("Should allow owner to transfer ownership", async function () {
            await meteoriteToken.transferOwnership(addr1.address);
            expect(await meteoriteToken.owner()).to.equal(addr1.address);
        });
    });
});