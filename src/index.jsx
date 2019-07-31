import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './style.css';
import {
	Header,
	Icon,
	Input,
	Container,
	Segment,
	Button,
	List,
	Grid,
	Divider,
	Label,
	Dimmer,
	Loader
} from 'semantic-ui-react';

import ResultsList from './ResultsList.jsx';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: '',
			response: [],
			responseLoaded: false,
			buttonDisabled: false,
			loaderEnabled: false
		};

		this.fetchResults = this.fetchResults.bind(this);
	}

	fetchResults(arg) {
		console.log(`fetching ${arg}...`);
		axios.get('/scrape/' + arg).then((res) => {
			console.log(res.data);
			this.setState({
				response: res.data,
				buttonDisabled: false,
				responseLoaded: true,
				loaderEnabled: false
			});
		});
	}

	onButtonClick = () => {
		this.setState({
			loading: this.state.value,
			buttonDisabled: true,
			loaderEnabled: true
		});
		this.fetchResults(this.state.value);
	};

	render() {
		const { response } = this.state;

		if (this.state.responseLoaded) {
			return (
				<Container textAlign="center">
					<br />
					<Header color="blue" as="h1" icon>
						<Icon inverted color="blue" name="google" circular />
						<Header.Content>Google Scraper</Header.Content>
					</Header>

					<br />
					<br />

					<Input
						action={() => (
							<Button
								disabled={this.state.buttonDisabled}
								color="blue"
								animated
								onClick={this.onButtonClick}
							>
								<Button.Content visible>Search</Button.Content>
								<Button.Content hidden>
									<Icon name="search" />
								</Button.Content>
							</Button>
						)}
						onChange={(evt) => this.setState({ value: evt.target.value })}
					/>

					<br />
					<br />

					<Divider horizontal>
						<Icon name="question circle outline" />
						&nbsp; People Also Asked
					</Divider>
					<Grid centered padded>
						<Segment compact stacked>
							<List>
								<ResultsList questions={response.group1.questions} />
							</List>
						</Segment>
					</Grid>
				</Container>
			);
		} else {
			return (
				<Container textAlign="center">
					<br />
					<Header color="blue" as="h1" icon>
						<Icon inverted color="blue" name="google" circular />
						<Header.Content>Google Scraper</Header.Content>
					</Header>

					<br />
					<br />

					<Input
						action={() => (
							<Button
								disabled={this.state.buttonDisabled}
								color="blue"
								animated
								onClick={this.onButtonClick}
							>
								<Button.Content visible>Search</Button.Content>
								<Button.Content hidden>
									<Icon name="search" />
								</Button.Content>
							</Button>
						)}
						onChange={(evt) => this.setState({ value: evt.target.value })}
					/>

					<Segment className='loading_segment' >
						<Dimmer active={this.state.loaderEnabled} inverted>
							<Loader indeterminate>Scraping Searches</Loader>
						</Dimmer>
					</Segment>

					<Label attached="bottom right" color="blue" size="small">
						For Educational Purposes Only
					</Label>
				</Container>
			);
		}
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
