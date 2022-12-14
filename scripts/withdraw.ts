// scripts/withdraw.ts

const hre = require("hardhat");
const abi = require("../artifacts/contracts/BuyMeCoffee.sol/BuyMeACoffee.json");

async function getBalance(provider:any, address: any) {
    const balanceBigInt = await provider.getBalance(address);
    return hre.ethers.utils.formatEther(balanceBigInt);
}

async function main() {
    const contractAddress="0xC942eFB931ACe042496FD46953083dfA152aD1C4"
    const contractABI = abi.abi;

    const provider = new hre.ethers.providers.AlchemyProvider("goerli", process.env.GOERLI_API_KEY);

    const signer = new hre.ethers.Wallet(process.env.PRIVATE_KEY, provider);

    const buyMeACoffee = new hre.ethers.Contract(contractAddress, contractABI, signer);

    console.log("current balance of owner: ", await getBalance(provider, signer.address), "ETH");
    const contractBalance = await getBalance(provider, buyMeACoffee.address);
    console.log("current balance of contract: ", await getBalance(provider, buyMeACoffee.address), "ETH");

    if(contractBalance !== "0.0") {
        console.log("withdrawing funds...")
        const  withdrawTxn = await buyMeACoffee.withdrawTips()
        await withdrawTxn.wait()
    } else {
        console.log("no funds :(")
    }

    console.log("current balance of owner: ", await getBalance(provider, signer.address), "ETH");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
});

export {}