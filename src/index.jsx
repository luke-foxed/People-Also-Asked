import React from 'react';
import { CacheHelper } from './cacheHelper';
import ResultsList from './ResultsList.jsx';
import Footer from './Footer.jsx';
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
  Divider,
  Label,
  Dimmer,
  Loader,
  Image,
  Grid
} from 'semantic-ui-react';

let cacheHelper = new CacheHelper();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      response: [],
      responseLoaded: false,
      buttonDisabled: false,
      loaderEnabled: false
    };

    this.fetchResults = this.fetchResults.bind(this);
  }

  fetchResults(searchTerm) {
    console.log(`Fetching ${searchTerm}...`);

    let cache = cacheHelper.checkCacheForSearchTerm(searchTerm);

    if (cache !== undefined) {
      console.log('Found cache...');
      this.setState({
        response: cache.response,
        buttonDisabled: false,
        responseLoaded: true,
        loaderEnabled: false
      });
    } else {
      return axios.get('/scrape/' + searchTerm).then(res => {
        console.log(res.data);
        this.setState({
          response: res.data,
          buttonDisabled: false,
          responseLoaded: true,
          loaderEnabled: false
        });
        cacheHelper.writeToCache(this.state);
      });
    }
  }

  onButtonClick = () => {
    this.setState({
      searchTerm: this.state.value,
      buttonDisabled: true,
      loaderEnabled: true
    });
    this.fetchResults(this.state.value);
  };

  render() {
    const { response } = this.state;

    if (this.state.responseLoaded) {
      return (
        <div>
          <Container textAlign="center" className="header_container">
            <br />
            <Image
              className="header_image"
              src="https://i.ibb.co/q1fNRDs/logo-invertedv4.png"
              size="large"
            />
          </Container>
          <br />
          <br />
          <Container textAlign="center" style={{ minHeight: '560px' }}>
            <Input
              size="large"
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
              onChange={evt => this.setState({ value: evt.target.value })}
            />

            <br />
            <br />

            <Divider horizontal>
              <Icon name="question circle outline" />
              &nbsp; People Also Asked
            </Divider>

            <Header textAlign="left">
              <Icon name="search" />
              <Header.Content className="uppercase_header">
                You Searched: '{this.state.searchTerm}'
              </Header.Content>
            </Header>
            <Segment compact stacked>
              <Dimmer active={this.state.loaderEnabled} inverted>
                <Loader indeterminate>Scraping Searches...</Loader>
              </Dimmer>

              <ResultsList questions={response.group1.questions} />
            </Segment>
          </Container>

          <br />

          <Footer />
        </div>
      );
    } else {
      return (
        <div>
          <Container textAlign="center" className="header_container">
            <br />
            <Image
              className="header_image"
              src="https://i.ibb.co/q1fNRDs/logo-invertedv4.png"
              size="large"
            />
          </Container>
          <br />
          <br />
          <Container textAlign="center">
            <Input
              size="large"
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
              onChange={evt => this.setState({ value: evt.target.value })}
            />

            <Segment className="loading_segment">
              <Dimmer active={this.state.loaderEnabled} inverted>
                <Loader indeterminate>Scraping Searches...</Loader>
              </Dimmer>
            </Segment>

            <Label attached="bottom right" color="blue" size="small">
              For Educational Purposes Only
            </Label>
          </Container>
        </div>
      );
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
