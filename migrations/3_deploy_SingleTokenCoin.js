var SingleTokenCoin = artifacts.require('./SingleTokenCoin.sol');

module.exports = function(deployer) {
  deployer.deploy(SingleTokenCoin, { from: web3.eth.accounts[0], gas: 4712380, gasLimit: 200000000 });
};