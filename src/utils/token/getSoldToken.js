import getWeb3 from '../provider/web3';

import TokenContract from '../../contracts/SingleTokenCoin.json';

const contract = require('truffle-contract');

export async function getSoldToken() {
  const web3Provider = await getWeb3.then(results => results.web3);
  const account = web3Provider.eth.accounts[0];

  const tokenContract = contract(TokenContract);
  tokenContract.setProvider(web3Provider.currentProvider);

  const instance = await tokenContract.deployed();
  const tokens = await instance.totalSupply({ gas: 4412200, from: account })
    .then(result => result.toString());

  return tokens;
}
