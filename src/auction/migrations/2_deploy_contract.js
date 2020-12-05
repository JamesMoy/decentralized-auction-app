var AuctionHouse = artifacts.require("../contracts/AuctionHouse.sol");

module.exports = function(deployer, network, accounts){
	deployer.deploy(AuctionHouse);
}
