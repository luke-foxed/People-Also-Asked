import React from 'react';
import ReactDOM from 'react-dom';
import Favicon from 'react-favicon';
import axios from 'axios';
import { Header, Icon, Input, Container, Segment, Button, List, Grid, Divider } from 'semantic-ui-react';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: '',
			response: []
		};

		this.fetchResults = this.fetchResults.bind(this);
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

	onButtonClick = () => {
		this.setState({
			loading: this.state.value
		});

		this.fetchResults(this.state.value);
	};

	render() {
		const responseItems = this.state.response.map((res) => (
			<List.Item>
				<List.Icon name="search" />
				<List.Content>
					<List.Header>{res}</List.Header>
					{/* <List.Description>
						<br />To be added...
					</List.Description> */}
				</List.Content>
			</List.Item>
		));

		return (
			<Container textAlign="center">
				<br />
				<Header color="blue" as="h2" icon>
					<Icon inverted color="blue" name="google" circular />
					<Header.Content>Google Scraper</Header.Content>
				</Header>

				<br />
				<br />

				<Input
					action={() => (
						<Button emphasis="primary" onClick={this.onButtonClick}>
							SEARCH
						</Button>
					)}
					onChange={(evt) => this.setState({ value: evt.target.value })}
				/>

				<br />
				<br />

				<Divider padded="true" horizontal>
					&nbsp;
				</Divider>

				<Grid centered padded>
					<Segment compact stacked>
						<List relaxed>{responseItems}</List>
					</Segment>
				</Grid>

				{/* <form onSubmit={this.startScraper}>
					<Favicon url="https://raw.githubusercontent.com/aerobatic/react-starter/master/app/react.ico" />
					<label>
						{this.state.search}
						<input type="text" name="name" ref="search" />
					</label>
					<input type="submit" value="Submit" />
					<h1>{this.state.loading}</h1>
					<ol>{responseItems}</ol>
        </form> */}
			</Container>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
