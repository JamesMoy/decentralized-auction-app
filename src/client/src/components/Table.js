import React, { Component } from 'react';

export class table extends Component{
	handleChange=(auction)=> {
		let _auction = auction;
		this.props.bid(_auction)
	}

	render(){
		let auctionList = this.props.auctions.map((auction, i)=>
			<tr key={i}>
			<td>{auction.itemName}</td>
			<td>{auction.highestBid}</td>
			<td>{auction.leadingBidder}</td>
			<td>{auction.timeRemaining}</td>
			<td> onClick = {this.handleChange.bind(this,auction.itemName)}>{bid}</td>
			</tr>
		)

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
						<th>Bid</th>
					</tr>
					{auctionList}
				</tbody>
			</table>
			</div>
		)
	}
}
