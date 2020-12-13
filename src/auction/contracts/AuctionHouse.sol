pragma solidity >=0.4.22 <0.7.0;
pragma experimental ABIEncoderV2;

contract AuctionHouse {

    struct Auction {
        string itemName;
        address payable leadingBidder;
        address payable auctionCreator;
        uint bid;
        uint total;
	uint h;
	uint m;
	uint s;
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

    function createAuction(string memory name, uint bidStart, uint shours, uint sminutes, uint sseconds) public {
        //establishes timestamp on the auction
        Auction memory newAuction = Auction({
            itemName: name,
            leadingBidder: msg.sender,
            auctionCreator: msg.sender,
            bid: bidStart,
            total: 0,
	    h: shours,
	    m: sminutes,
	    s: sseconds,
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
        return auctions[auctionID].bid;   //the current state of highest bid is the last winning bid
    }

    function viewPreviousAuction(uint auctionID) public view returns(string memory name, uint bid, uint hour, uint minute, uint second) {
        return (auctions[auctionID].itemName, auctions[auctionID].bid, auctions[auctionID].h, auctions[auctionID].m, auctions[auctionID].s);
    }

    function getAuctionCount() public view returns(uint) {
    	return auctionCount;
    }

    function placeBid(uint auctionID, uint bidValue) public payable {
        require(auctions[auctionID].completed == false, 'Auction must be active');
        require(bidValue >= auctions[auctionID].bid, 'Bid must be greater than starting bid');

        auctions[auctionID].total += bidValue;
        auctions[auctionID].bid = bidValue;
        auctions[auctionID].leadingBidder = msg.sender;
        bidders[msg.sender] += bidValue;
    }

    function updateTime(uint auctionID, uint hs, uint ms, uint ss) public {
	auctions[auctionID].h = hs;
	auctions[auctionID].m = ms;
	auctions[auctionID].s = ss;
    }
}
