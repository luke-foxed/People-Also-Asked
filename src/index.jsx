import React from 'react';
import ReactDOM from 'react-dom';
import Favicon from 'react-favicon';
import axios from 'axios';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			search: 'Enter Search Query',
			loading: '',
			response: []
		};

		this.fetchResults = this.fetchResults.bind(this);
		this.startScraper = this.startScraper.bind(this);
	}

	fetchResults(arg) {
		console.log(`fetching ${arg}...`);
		axios.get('http://127.0.0.1:2000/scrape/' + arg).then((res) => {
			console.log(res.data);
			this.setState({
				response: res.data
			});
		});
	}

	startScraper(seachTerm) {
		seachTerm.preventDefault();
		let searches = 'You searched ' + this.refs.search.value + ', please wait...';
		this.setState({
			loading: searches
		});

		this.fetchResults(this.refs.search.value);
	}

	render() {

    const responseItems = this.state.response.map((res) =>
    <li>{res}</li>
  );

		return (
			<form onSubmit={this.startScraper}>
				<Favicon url="https://raw.githubusercontent.com/aerobatic/react-starter/master/app/react.ico" />
				<label>
					{this.state.search}
					<input type="text" name="name" ref="search" />
				</label>
				<input type="submit" value="Submit" />
				<h1>{this.state.loading}</h1>
        <ol>{responseItems}</ol>
			</form>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
