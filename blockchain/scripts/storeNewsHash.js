const crypto = require("crypto");

async function main() {
  const contractAddress = process.env.CONTRACT_ADDRESS;
  const content = process.env.NEWS_CONTENT || "Demo verified article content";
  const prediction = process.env.PREDICTION || "real";
  const credibilityScore = Number(process.env.CREDIBILITY_SCORE || 84);

  const contentHash = `0x${crypto.createHash("sha256").update(content).digest("hex")}`;
  const contract = await ethers.getContractAt("NewsVerify", contractAddress);
  const tx = await contract.storeNewsHash(contentHash, prediction, credibilityScore);
  await tx.wait();
  console.log(`Stored ${contentHash} in tx ${tx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

