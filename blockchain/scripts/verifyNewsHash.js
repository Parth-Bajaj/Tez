const crypto = require("crypto");

async function main() {
  const contractAddress = process.env.CONTRACT_ADDRESS;
  const content = process.env.NEWS_CONTENT || "Demo verified article content";
  const contentHash = `0x${crypto.createHash("sha256").update(content).digest("hex")}`;
  const contract = await ethers.getContractAt("NewsVerify", contractAddress);
  const exists = await contract.verifyNewsHash(contentHash);
  console.log(`Hash ${contentHash} exists: ${exists}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

