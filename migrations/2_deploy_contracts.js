
const Transport = artifacts.require("./Transport.sol");
const IoT = artifacts.require("./IoT.sol");

module.exports = function (deployer) {
  deployer.deploy(Transport);
  deployer.deploy(IoT);
};