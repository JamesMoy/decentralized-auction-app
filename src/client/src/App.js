import React { Component } from 'react';
import Table from './components/Table.js';
import { ratingContract, account0 } from "./config";





class App extends Component {
	constructor(props){
		super(props)
		this.state = {
			auction: [],
		}
		this.handleAuction = this.handleAuction.bind(this)
	}

	handleAuction(auction) {
		setTable(auction);
	}


	setTable(auctions) {
		for(let i = 1; i < 11; i++) {
			setState({
				auction: this.state.auction.concat(ratingContract.methods.viewPreviousAuction(-1 *i).call()),
			});
		}
	}




	caModal() {
		const [show, setShow] = useState(false);

		const handleClose = () => setShow(false);
		cosnt handleShow = () => setShow(true);

		return (
			<>
			<Button variant="primary






	render() {

		return (
			<div className="App">
			<header>Freetrade</header>
			<button onClick={addAuction}>Create an Auction</button>
			<div className="current-table">
			<Table auctions={this.state.auctions}/>
			</div>
			</div>
		);
	}
}
