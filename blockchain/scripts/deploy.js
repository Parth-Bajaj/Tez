async function main() {
  const NewsVerify = await ethers.getContractFactory("NewsVerify");
  const contract = await NewsVerify.deploy();
  await contract.waitForDeployment();
  console.log(`NewsVerify deployed to ${await contract.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

