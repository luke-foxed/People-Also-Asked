import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "Enter Search Query",
      loading: "",
      response: ""
    };

    this.fetchResults = this.fetchResults.bind(this);
    this.startScraper = this.startScraper.bind(this);
  }

  fetchResults(arg) {
    console.log(`fetching ${arg}...`);
    fetch("http://127.0.0.1:2000/scrape/" + arg).then(res => {
      let items = res;
      items.forEach(item => {
        console.log(item);
      });
      this.setState({
        response: JSON.stringify(res)
      });
    });
  }

  startScraper(seachTerm) {
    seachTerm.preventDefault();
    let searches =
      "You searched " + this.refs.search.value + ", please wait...";
    this.setState({
      loading: searches
    });

    this.fetchResults(this.refs.search.value);
  }

  render() {
    return (
      <form onSubmit={this.startScraper}>
        <label>
          {this.state.search}
          <input type='text' name='name' ref='search' />
        </label>
        <input type='submit' value='Submit' />
        <h1>{this.state.loading}</h1>
        <p>{this.state.response}</p>
      </form>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
