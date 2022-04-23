require("dotenv").config();
const API_URL =
  "https://eth-ropsten.alchemyapi.io/v2/ybTaqdf52SSno-0vdnTbxPCm1Cf62B83";
const PUBLIC_KEY = "0x70d1687e49B3bCc3e6f7aa89447BAcc185BBBA6e";
const PRIVATE_KEY =
  "ba36f87aba2f3f661d1560198d36280d6b48275bfe2de033ca7dad31c9000ae8";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");

const contractAddress = "0x3d70b7ec0a272420b74099dc8b9ef8fcc4d5b73d";

const nftContract = new web3.eth.Contract(contract.abi, contractAddress);
const tokenURI =
  "https://gateway.pinata.cloud/ipfs/QmYA5w78RFhuvTVoU5HEuLutY9pWrtEAA1RPZxo9zzv1pK";
export const mintNFT = async (tokenURI) => {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce

  //the transaction
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  };

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(
        err,
        hash
      ) {
        if (!err) {
          console.log(
            "The hash of your transaction is: ",
            hash,
            "\nCheck Alchemy's Mempool to view the status of your transaction!"
          );
        } else {
          console.log(
            "Something went wrong when submitting your transaction:",
            err
          );
        }
      });
    })
    .catch((err) => {
      console.log(" Promise failed:", err);
    });
};
