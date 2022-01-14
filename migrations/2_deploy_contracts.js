const Transport = artifacts.require("./Transport.sol");

module.exports = function (deployer) {
  deployer.deploy(Transport);
};
