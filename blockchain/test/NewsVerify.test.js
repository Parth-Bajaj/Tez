const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NewsVerify", function () {
  it("stores and verifies a content hash", async function () {
    const Factory = await ethers.getContractFactory("NewsVerify");
    const contract = await Factory.deploy();
    await contract.waitForDeployment();

    const hash = ethers.keccak256(ethers.toUtf8Bytes("sample-news"));
    await contract.storeNewsHash(hash, "real", 90);

    expect(await contract.verifyNewsHash(hash)).to.equal(true);
  });
});

