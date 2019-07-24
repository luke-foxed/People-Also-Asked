import React from 'react';
import ReactDOM from 'react-dom';
import Favicon from 'react-favicon';
import axios from 'axios';
import { Header, Icon, Input, Container, Form, Button } from 'semantic-ui-react';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			search: 'Search query',
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

  handleMessage = e => { 
    console.log('clicked')
    console.log(e.target.value); }

	render() {
		const responseItems = this.state.response.map((res) => <li>{res}</li>);

		return (
			<Container textAlign="center">
				<br />
				<Header color="blue" as="h2" icon textAlign="center">
					<Icon inverted color="blue" name="google" circular />
					<Header.Content>Google Scraper</Header.Content>
				</Header>

				<br />
				<br />

        <Input action={{ color: 'blue', icon: 'search' }} ref='search' onClick={this.handleMessage} />

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
			</Container>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
