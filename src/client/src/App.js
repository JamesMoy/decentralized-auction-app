import React { Component } from 'react';
import Table from './components/Table.js';
import { ratingContract, account0 } from "./config";

class App extends Component {
	constructor(props){
		super(props)
		this.state = {
			auction: [],
			item: [],
			bid: [],
			bidder: [],
			time: []
		}
		this.handleAuction = this.handleAuction.bind(this)
	}
	handleAuction(auction) {
		return 0;
	}

	render() {
		return (
			<div className="App">
			<header>Freetrade</header>
			<div className="current-table">
			<Table auctions={this.state.auction}/>
			</div>
			</div>
		);
	}
}
