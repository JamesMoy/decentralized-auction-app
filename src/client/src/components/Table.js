import React, { Component }  from 'react';
import Timer from 'react-compound-timer';
import { ratingContract, account0 } from '../config';



export class Table extends Component{
	constructor(props) {
		super(props);
		this.state = {
			auction: [this.props.auction]
		}
	}

	render() {
		let auctionList = this.props.auction.map((auction, i)=>
			<tr key={i}>
			<td>{this.props.auction[i].name}</td>
			<td>{this.props.auction[i].bid}</td>
			<td>
			<Timer
				initialTime={ 60000 * 60 * this.props.auction[i].hours + this.props.auction[i].minutes * 60000 + this.props.auction[i].seconds * 1000}
				direction="backward"
				lastUnit="h"
				checkpoints={[
					{
						time: *,
						callback: ratingContract.methods.updateTime(i, Timer.Hours, Timer.Minutes, Timer.Seconds).send({from: account0, gas:670000}),
					},
					{
						time: 0,
						callback: ratingContract.methods.setAuctionWinner(i, account0).send({from account0, gas:670000}),
					}
				]}
			>
				{() => (
					<React.Fragment>
						<Timer.Hours />:
						<Timer.Minutes />:
						<Timer.Seconds />
					</React.Fragment>
				)}
			</Timer>
			</td>
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
