import React from 'react';
import ReactDOM from 'react-dom';
import View from '../../node_modules/view/index.js';
import Search from './Search.js';

class Header extends React.Component {
	render() {
		const mystyle = {
			color: "gold",
			backgroundColor: "purple",
			padding: "10px",
		};
		return (
			<div>
				<h1 style ={mystyle}>Freetrade</h1>
				<Search />
			</div>
		);
	}
}

export default Header;
