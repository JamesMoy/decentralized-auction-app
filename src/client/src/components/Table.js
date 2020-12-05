import React, { Component }  from 'react';
import Countdown from './Countdown.js';



export class Table extends Component{
	constructor(props) {
		super(props);
		this.state = {
			auction: this.props.auction,
			item: this.props.auction.itemName,
			bid: this.props.auction.highestBid,
			bidder: this.props.auction.leadingBidder,
			time: {
				hours: 1,
				minutes: 1,
				seconds: 1
			}

		}
	}

	render() {
		let auctionList = this.props.auction.map((auction, i)=>
			<tr key={i}>
			<td>{this.state.item}</td>
			<td>{this.state.bid}</td>
			<td>{this.state.bidder}</td>
			<td><Countdown hours={this.state.time.hours} minutes={this.state.time.minutes} seconds={this.state.time.seconds}></Countdown></td>
			</tr>
		);

		return (
			<div>
			<h3> Auctions</h3>
			<table >
				<tbody>
					<tr>
						<th>Item</th>
						<th>Highest Bid</th>
						<th>Leading Bidder</th>
						<th>Time Remaining</th>
					</tr>
					{auctionList}
				</tbody>
			</table>
			</div>
		);
	}

}
export default Table;
