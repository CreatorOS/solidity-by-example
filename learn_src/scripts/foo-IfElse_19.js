// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require('hardhat');
const BN = require('bn.js');

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const ContractFactory = await hre.ethers.getContractFactory('IfElse');
  const contract = await ContractFactory.deploy();

  await contract.deployed();
  console.log('IfElse Contract deployed to:', contract.address);
  try {
    console.log(`Calling foo(5)`);
    let num = await contract.foo(5);
    console.log('foo(5) output (input < 10): ', num.toString());
    console.log(`\nCalling foo(11)`);
    num = await contract.foo(11);
    console.log('foo(11) output (input > 10 and < 20): ', num.toString());
    console.log(`\nCalling foo(30)`);
    num = await contract.foo(30);
    console.log('foo(30) output (input > 20): ', num.toString());
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
