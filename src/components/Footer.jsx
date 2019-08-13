import React from 'react';
import '../../static/style.css';
import {
  Icon,
  Container,
  Grid,
  Modal,
  Header,
  Button
} from 'semantic-ui-react';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };
  }

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  render() {
    return (
      <Container className="footer">
        <Grid columns={1}>
          <Grid.Column verticalAlign="middle">
            <Icon
              className="footer_icon"
              name="code branch"
              size="large"
              inverted
              onClick={() => {
                window.open(
                  'https://github.com/Foxyf76/People-also-asked',
                  '_blank'
                );
              }}
            />

            <Icon
              className="footer_icon"
              name="github"
              size="large"
              inverted
              onClick={() => {
                window.open('https://github.com/Foxyf76/', '_blank');
              }}
            />

            <Icon
              className="footer_icon"
              name="globe"
              size="large"
              inverted
              onClick={() => {
                window.open('http://distilledsch.ie/', '_blank');
              }}
            />

            <Modal
              size="small"
              basic
              trigger={
                <Icon
                  className="footer_icon"
                  name="plus"
                  size="large"
                  inverted
                  onClick={() => {
                    this.setState({
                      modalOpen: true
                    });
                  }}
                />
              }
              open={this.state.modalOpen}
            >
              <Header
                size="large"
                icon="user"
                content="SEO Scraper - Created by Luke Fox"
              />
              <Modal.Content>
                <p>
                  This app works by scraping Google's SEO results (known as
                  'People also Asked'). A parent search term is provided above,
                  which in turn scrapes the 'people also asked' section on the
                  search results page. Each of these scraped results become the
                  search term for the next round of scraping.
                </p>

                <p>
                  After many itterations, this process creates a tree-like
                  structure - where the first search term acts as the parent and
                  the corresponding search terms become the children. These
                  children can be accessed from the 'See Related' button.
                </p>

                <p>
                  Also, this app uses caching to save your search terms so the
                  results they will load straight away if the search term has
                  been used before!
                </p>
              </Modal.Content>
              <Modal.Actions>
                <Button color="green" onClick={this.handleClose} inverted>
                  <Icon name="checkmark" /> Got it
                </Button>
              </Modal.Actions>
            </Modal>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default Footer;
