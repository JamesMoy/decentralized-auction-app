import React,  { Component } from 'react';
import Table from './components/Table.js';
import { ratingContract, account0 } from "./config";
import Modal from 'react-modal';

class App extends Component {
	constructor(props){
		super(props)
		this.state = {
			auction: [],
			time: {
				hours: 0,
				minutes: 0,
				seconds: 0
			},
			showModal: false,
			cTime: '',
			cItem: '',
			cBid: 0,
			auctnum: 0
		}
		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChangeItem =this.handleChangeItem.bind(this);
		this.handleChangeBid = this.handleChangeBid.bind(this);
	}



	async setTable() {
		let leng = await ratingContract.methods.getAuctionCount().call();
		for(let i = 0; i < leng; i++) {
			let list = await ratingContract.methods.viewPreviousAuction(i).call();
			let tempList = {name: list[0], bid: list[1]};
			this.setState({auction: this.state.auction.concat(tempList)});
		}
	}

	async componentDidMount() {
		await this.setTable();
	}

	handleOpenModal() {
		this.setState({showModal: true});
	}

	handleCloseModal() {
		this.setState({showModal: false});
	}


	handleChangeItem(event){
		this.setState({cItem: event.target.value});
	}

	handleChangeBid(event){
		this.setState({cBid: event.target.value});
	}


	handleSubmit(event){
		ratingContract.methods.createAuction(this.state.cItem, this.state.cBid).send({from: account0, gas:670000});
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
						Set minimum bid amount:
						<input type="number" value={this.state.cBid} onChange={event => this.handleChangeBid(event)} />
					</label>
					<input type="submit" value="Submit" />
				</form>
			</Modal>
			<div className="current-table">
			<Table auction={this.state.auction}/>
			</div>
			</div>
		);
	}
}
export default App;
