pragma solidity >=0.4.22 <0.7.0;
pragma experimental ABIEncoderV2;

contract AuctionHouse {

    struct Auction {
        string itemName;
        uint minBid;
        uint highestBid;
        address payable leadingBidder;
        address payable auctionCreator;
        uint total;
        bool completed;
    }

    Auction[] public auctions;

    mapping(address => uint) public bidders;

    mapping(address => bool) public auctionWinners;

    uint public auctionCount;

    address public manager;


    constructor() public {
        manager = msg.sender;
    }

    function createAuction(string memory name, uint bid) public {
        //establishes timestamp on the auction
        Auction memory newAuction = Auction({
            itemName: name,
            minBid: bid,
            highestBid: 0,  //keeps track of last winning bid- new bid must be higher >-handle double spending of bids
            leadingBidder: msg.sender,
            auctionCreator: msg.sender,
            total: 0,
            completed: false
        });

        auctions.push(newAuction);
        auctionCount++;
    }

    function setAuctionWinner(uint auctionID, address payable winner) public {
        require(auctions[auctionID].completed == false, 'Auction must be active');
        auctions[auctionID].leadingBidder = winner;     //the current leading bidder will be the winner if the auction has expired
        auctionWinners[winner] = true;
        auctions[auctionID].completed = true;
    }

    function getLastSoldVal(uint auctionID) public view returns (uint) {
        require(auctions[auctionID].completed == true, 'Auction must be completed');
        return auctions[auctionID].highestBid;   //the current state of highest bid is the last winning bid
    }

    function viewPreviousAuction(uint auctionID) public view returns(string memory, uint) {
        return (auctions[auctionID].itemName, auctions[auctionID].highestBid);
    }

    function placeBid(uint auctionID, uint bidValue) public payable {
        require(auctions[auctionID].completed == false, 'Auction must be active');
        require(bidValue >= auctions[auctionID].minBid, 'Bid must be greater than minimum');
        auctions[auctionID].total += bidValue;

        //conditional check for updating last bid value
        require(bidValue > bidders[msg.sender], 'Next bid must be higher than previous bid');


        if(bidValue > auctions[auctionID].highestBid) {
            auctions[auctionID].highestBid = bidValue;
            auctions[auctionID].leadingBidder = msg.sender;
            bidders[msg.sender] += bidValue;
        }
    }

    function getAuctionCount() public view returns(uint) {
    	return auctionCount;
    }
    function stringToBytes32(string memory source) private pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly {
            result := mload(add(source, 32))
        }
    }
}
