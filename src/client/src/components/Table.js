import React, { Component }  from 'react';
import Timer from 'react-compound-timer';


export class Table extends Component{
	constructor(props) {
		super(props);
		this.state = {
			auction: [this.props.auction],
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
			<td>{this.props.auction[i].name}</td>
			<td>{this.props.auction[i].bid}</td>
			<td>
			<Timer
				initialTime={60000}
				direction="backward"
				lastUnit="h"
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
