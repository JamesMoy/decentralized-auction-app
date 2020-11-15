import React from 'react';
class Search extends React.Component {
	state = {
		search: '',
	}

	updateSearch = (event) => {
		this.setState({
			search: event.target.value
		});
	}

	render() {
		const {search} = this.state;

		return (
			<div>
			<input type="text" onChange={this.updateSearch} value={search}/>
			<button>Click</button>
			</div>
		);
	}
}
export default Search;
