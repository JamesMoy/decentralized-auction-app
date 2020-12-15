import React,  { Component } from 'react';
import Table from './components/Table.js';
import { ratingContract, account0 } from "./config";
import Modal from 'react-modal';

class App extends Component {
	constructor(props){
		super(props)
		this.state = {
			auction: [],
			showModal: false,
			showBidModal: false,
			cTime: "Enter Time as hh:mm:ss",
			cItem: '',
			cBid: 0,
			cHour: 0,
			cMinute: 0,
			cSecond: 0
		};
		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChangeItem =this.handleChangeItem.bind(this);
		this.handleChangeBid = this.handleChangeBid.bind(this);
		this.handleChangeTime = this.handleChangeTime.bind(this);
		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
		this.bid = this.bid.bind(this);
		this.setWinner = this.setWinner.bind(this);
	}



	async setTable() {
		let leng = await ratingContract.methods.getAuctionCount().call();
		for(let i = 0; i < leng; i++) {
			let list = await ratingContract.methods.viewPreviousAuction(i).call();
			let tempList = {name: list[0], bid: list[1], hours: list[2], minutes: list[3], seconds: list[4]};
			if(list[2] + list[3] + list[4] === 0) { continue; }
			this.setState({auction: this.state.auction.concat(tempList)});
		}
	}

	async componentDidMount() {
		await this.setTable();
	}

	//getSnapshotBeforeUpdate(prevProps, prevState) {
	//	ratingContract.methods.updateTime(h,s,m).send({from: account0, gas:670000});
	//}

	handleOpenModal() {
		this.setState({showModal: true});
	}

	handleCloseModal() {
		this.setState({showModal: false});
	}


	handleOpenBidModal() {
		this.setState({showBidModal: true});
	}

	handleCloseBidModal() {
		this.setState({showBidModal: false});
	}

	handleChangeItem(event){
		this.setState({cItem: event.target.value});
	}

	handleChangeBid(event){
		this.setState({cBid: event.target.value});
	}

	handleChangeTime(event){
		this.setState({cTime: event.target.value});
		let h = parseInt(this.state.cTime.substring(0,2), 10);
		let m = parseInt(this.state.cTime.substring(3,5), 10);
		let s = parseInt(this.state.cTime.substring(6), 10);
		this.setState({cHour: h, cMinute: m, cSecond: s});
	}


	handleSubmit(event){
		ratingContract.methods.createAuction(this.state.cItem, this.state.cBid, this.state.cHour, this.state.cMinute, this.state.cSecond).send({from: account0, gas:670000});
	}


	bid(auction, bidAmount){
		ratingContract.methods.placeBid(auction, bidAmount).send({from: account0, gas:670000});
	}

	setWinner(i) {
		ratingContract.methods.setAuctionWinner(i, account0).send({from: account0, gas: 670000});
		ratingContract.methods.updateTime(i, 0, 0, 0).send({from: account0, gas: 670000});
		let auction = [...this.state.auction];
		auction.splice(i, 1);
		this.setState({auction: auction});
	}

	render() {
		return (
			<div className="App">
			<header>Freetrade</header>
			<button onClick={this.handleOpenModal}>Create an Auction</button>
			<Modal
				isOpen={this.state.showModal}
				ariaHideApp={false}
			>
				<form onSubmit={this.handleSubmit}>
					<label>
						Item Name:
						<input type="text" value={this.state.cItem} onChange={event => this.handleChangeItem(event)} />
					</label>
					<label>
						Set time:
						<input type="text" value={this.state.cTime} onChange={event => this.handleChangeTime(event)} />
					</label>
					<label>
						Set minimum bid amount:
						<input type="number" value={this.state.cBid} onChange={event => this.handleChangeBid(event)} />
					</label>
					<input type="submit" value="Submit" />
				</form>
			</Modal>
			<div className="current-table">
			<Table auction={this.state.auction} bid={this.bid} setWinner={this.setWinner} />
			</div>
			</div>
		);
	}
}
export default App;
