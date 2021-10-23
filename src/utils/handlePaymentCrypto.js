import React from "react";
const Web3 = require("web3");
let userAddress;
let flag = false;
let isNCR = false;

export function openWeb3(event, ncrCoin) {
  // alert("Connecting to your Ethereum wallet");

  window.web3 = new Web3(window.ethereum);
  window.ethereum.enable();

  isNCR = ncrCoin;

  // Initiate login verification
  connectionSuccess().then((response) => {
    console.log(response);

    // sign the transaction with some orderid
    /*window.web3.eth.sign("HACK_GT_2021", userAddress)
        .then(console.log);*/

    makePurchase();
  });
}

async function makePurchase() {
  let price = 100000000000000;

  // resolve the ENS name
  let chain = 'ropsten';
  let transaction;
  if (isNCR)
  {
    let tokenAddr = '0xC666d239cbda32AA7ebCA894B6dC598dDb881285';
    let toAddr = '0xb4BAEfAc5199E71F8ADfBCE2240693Fd21869a33';
    // Use Big Number
    // Use BigNumber
    let decimals = window.web3.utils.toBN(18);
    let amount = window.web3.utils.toBN(100);
    
    let minABI = [
      // transfer
      {
        "constant": false,
        "inputs": [
          {
            "name": "_to",
            "type": "address"
          },
          {
            "name": "_value",
            "type": "uint256"
          }
        ],
        "name": "transfer",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "type": "function"
      }
    ];

    // Get ERC20 Token contract instance
    let contract = new window.web3.eth.Contract(minABI, tokenAddr);

    // calculate ERC20 token amount
    let value = amount.mul(window.web3.utils.toBN(2).pow(decimals));

    // call transfer function
    contract.methods.transfer(toAddr, value).send({from: userAddress})
    .on('transactionHash', function(hash){
      console.log(hash);
    });
  }
  else
  {
  let toAddr = await window.web3.eth.ens.getAddress("hackgt2021market.eth");
  console.log(toAddr);
    transaction = 
      {
        to: toAddr,
        chain: 'ropsten',
        from: userAddress,
        value: price
      }
      window.web3.eth
    .sendTransaction(
      transaction
    )
    .then(function (receipt) {
      console.log(receipt);
    });
  }

}

async function connectionSuccess() {
  await until((_) => flag == true);

  await window.web3.eth.getAccounts().then((accounts) => {
    userAddress = accounts[0];
  });

  return await Promise.resolve("Connection Success");
}

function until() {
  const poll = (resolve) => {
    walletCheck();
    if (flag) resolve();
    else setTimeout((_) => poll(resolve), 400);
  };
  return new Promise(poll);
}

function walletCheck() {
  window.web3.eth.getAccounts().then(function (accounts) {
    if (accounts.length > 0) {
      flag = true;
      return true;
    } else {
      return false;
    }
  });
}
