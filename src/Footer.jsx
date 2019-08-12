import React from 'react';
import './style.css';
import { Icon, Container, Grid } from 'semantic-ui-react';

class Footer extends React.Component {
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
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default Footer;
