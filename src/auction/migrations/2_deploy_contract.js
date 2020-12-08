var AuctionHouse = artifacts.require("./AuctionHouse.sol");

module.exports = function(deployer, network, accounts){
	deployer.deploy(AuctionHouse);
}
