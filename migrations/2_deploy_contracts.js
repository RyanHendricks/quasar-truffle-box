const TestTokenERC20 = artifacts.require('./TestTokenERC20.sol');

module.exports = (deployer) => {
  deployer.deploy(TestTokenERC20);
};
