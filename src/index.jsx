import React from 'react';
import { CacheHelper } from '../static/cacheHelper';
import ResultsList from './components/ResultsList.jsx';
import Footer from './components/Footer.jsx';
import ReactDOM from 'react-dom';
import axios from 'axios';
import '../static/style.css';
import {
  Header,
  Icon,
  Input,
  Container,
  Segment,
  Button,
  Divider,
  Dimmer,
  Loader,
  Image,
  Label
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

    return (
      <div>
        <Container textAlign='center' className='header_container'>
          <Image
            className='header_image'
            src={require('./images/logo.png')}
            size='large'
            href='/'
            verticalAlign='middle'
          />
        </Container>

        <br />

        <Container textAlign='center'>
          <Input
            style={{ width: '300px' }}
            size='large'
            action={() => (
              <Button
                disabled={this.state.buttonDisabled}
                color='blue'
                animated
                onClick={this.onButtonClick}
              >
                <Button.Content visible>Search</Button.Content>
                <Button.Content hidden>
                  <Icon name='search' />
                </Button.Content>
              </Button>
            )}
            onChange={evt => this.setState({ value: evt.target.value })}
          />

          {!this.state.responseLoaded && (
            <div>
              <Container>
                <Dimmer active={this.state.loaderEnabled} inverted>
                  <Loader indeterminate>Scraping Searches...</Loader>
                </Dimmer>
              </Container>

              <Label attached='bottom right' color='blue' size='small'>
                For Educational Purposes Only
              </Label>
            </div>
          )}
        </Container>

        <br />

        {this.state.responseLoaded && (
          <div>
            <Container textAlign='center' style={{ minHeight: '560px' }}>
              <Divider horizontal>
                <Icon name='question circle outline' />
                &nbsp; People Also Asked
              </Divider>

              <Header textAlign='left'>
                <Icon name='search' />
                <Header.Content className='uppercase_header'>
                  You Searched: "{this.state.searchTerm}"
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
        )}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
