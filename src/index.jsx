import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./style.css";
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
  Label
} from "semantic-ui-react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: "",
      response: [],
      disabled: false
    };

    this.fetchResults = this.fetchResults.bind(this);
  }

  fetchResults(arg) {
    console.log(`fetching ${arg}...`);
    axios.get("/scrape/" + arg).then(res => {
      console.log(res.data);
      this.setState({
        response: res.data,
        disabled: false
      });
    });
  }

  onButtonClick = () => {
    this.setState({
      loading: this.state.value,
      disabled: true
    });
    this.fetchResults(this.state.value);
  };

  render() {
    const list = Object.entries(this.state.response).map(([key, value]) => {
      return (
        <List.Item className='my_list_v1'>
          <List.Icon name='search' />
          <List.Content>
            <List.Header>{key}</List.Header>
            <List.Description textAlign='left'>
              {value[0].toString()}
            </List.Description>
            <br />
            <List.Description>
              <Label
                as='a'
                href={value[1]}
                target='_blank'
                color='blue'
                size='large'
              >
                Contine Reading &nbsp;
                <Icon name='long arrow alternate right' />
              </Label>
            </List.Description>
          </List.Content>
        </List.Item>
      );
    });

    return (
      <Container textAlign='center'>
        <br />
        <Header color='blue' as='h2' icon>
          <Icon inverted color='blue' name='google' circular />
          <Header.Content>Google Scraper</Header.Content>
        </Header>

        <br />
        <br />

        <Input
          action={() => (
            <Button
              disabled={this.state.disabled}
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

        <br />
        <br />

        <Divider padded='true' horizontal>
          &nbsp;
        </Divider>

        <Grid centered padded>
          <Segment compact stacked>
            <List relaxed>{list}</List>
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

ReactDOM.render(<App />, document.getElementById("app"));
