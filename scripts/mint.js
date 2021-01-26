const ethers = require("ethers");
const NFT_CONTRACT_ADDRESS = "0xa4e2a202d2463eEc429E1443546e7d337Ec77D8d";
const OWNER_ADDRESS = "0xc2940e20CbE41f9b4CedF5B83aA55C3f28376004";
const PRIVATE_KEY = "3c660dd4aa1b30ff89f04ee311cd966266002fe91b14a4a79aaf897d755bc544"
const NETWORK = "rinkeby";
const NUM_CREATURES = 1;

if (!PRIVATE_KEY || !OWNER_ADDRESS || !NETWORK) {
  console.error(
    "Please set a private key, owner, network, and contract address, see .env.sample"
  );
  return;
}

const NFT_ABI = [
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address",
      },
    ],
    name: "mintTo",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

const FACTORY_ABI = [
  {
    constant: false,
    inputs: [
      {
        name: "_optionId",
        type: "uint256",
      },
      {
        name: "_toAddress",
        type: "address",
      },
    ],
    name: "mint",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

async function main() {
  const provider = ethers.providers.getDefaultProvider(NETWORK);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

  if (NFT_CONTRACT_ADDRESS) {
    const nftContract = new ethers.Contract(
      NFT_CONTRACT_ADDRESS,
      NFT_ABI,
      wallet
    );
    // Creatures issued directly to the owner.
    let mints = [];

    for (var i = 0; i < NUM_CREATURES; i++) {
      mints.push(nftContract.mintTo(OWNER_ADDRESS,{gasLimit:10000000}));
    }

    Promise.all(mints)
      .then((result) => console.log("Minted Creature. Transaction:", result))
      .catch((err) => console.log(err));
  }
}

main();
