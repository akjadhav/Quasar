import React from "react";
const Web3 = require("web3");
let userAddress;
let flag = false;

export function openWeb3(event) {
  alert("Connecting to your Ethereum wallet");

  window.web3 = new Web3(window.ethereum);
  window.ethereum.enable();

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
  let toAddr = await window.web3.eth.ens.getAddress("hackgt2021market.eth");
  console.log(toAddr);

  // using the promise
  window.web3.eth
    .sendTransaction({
      from: userAddress,
      to: toAddr,
      value: price,
    })
    .then(function (receipt) {
      console.log(receipt);
    });
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
