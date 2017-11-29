import getWeb3 from './provider/web3';

import SingleTokenCoin from '../contracts/SingleTokenCoin.json';

const contract = require('truffle-contract');

export async function transferTokenToAddress(addressTo, addressAmount) {
  const web3Provider = await getWeb3.then(results => results.web3);
  const account = web3Provider.eth.accounts[0];

  const singleTokenCoin = contract(SingleTokenCoin);
  singleTokenCoin.setProvider(web3Provider.currentProvider);

  const instance = await singleTokenCoin.deployed();
  const tokens = await instance.transfer(addressTo, addressAmount * 10000, { gas: 4412200, from: account })
    .then(result => result.toString());

  return tokens;
}
