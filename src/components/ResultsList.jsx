import React from 'react';
import '../../static/style.css';
import {
  Icon,
  Segment,
  Button,
  List,
  Popup,
  Message,
  Container
} from 'semantic-ui-react';

class ResultsList extends React.Component {
  constructor(props) {
    super(props);
    const questionState = [];

    for (let i = 0; i < props.questions.length; i++) {
      questionState.push({ isActive: false });
    }

    this.state = {
      questions: questionState
    };
  }

  changeActive(index) {
    var questionsArray = this.state.questions;

    if (questionsArray[index].isActive == false) {
      questionsArray[index].isActive = true;
    } else {
      questionsArray[index].isActive = false;
    }

    this.setState({ questions: questionsArray });
  }

  render() {
    const { questions } = this.props;

    if (questions.length > 0) {
      return (
        <div>
          <List>
            {questions.map((question, index) => {
              return (
                <List.Item className='results_list'>
                  <List.Content>
                    <List.Header className='uppercase_header' as='h3'>
                      {question.search}
                    </List.Header>

                    <List.Description className='list_description'>
                      {question.more}
                    </List.Description>

                    <Button.Group size='medium' style={{ marginTop: '25px' }}>
                      <Popup
                        inverted
                        wide='very'
                        content={question.article_header}
                        trigger={
                          <Button
                            icon='external'
                            content='Continue Reading'
                            as='a'
                            href={question.article_url}
                            target='_blank'
                          />
                        }
                      />
                      <Button.Or />
                      <Button
                        onClick={() => this.changeActive(index)}
                        color='blue'
                      >
                        <Icon name='chevron down' />
                        See Related
                      </Button>
                    </Button.Group>
                  </List.Content>

                  <List.List>
                    {this.state.questions.length > 0}
                    {question.children.map((child, childIndex) => {
                      return (
                        <Segment
                          padded
                          style={{
                            display: this.state.questions[index].isActive
                              ? 'block'
                              : 'none'
                          }}
                        >
                          <List.Item>
                            <List.Content>
                              <List.Header className='uppercase_header' as='h4'>
                                {child.search}
                              </List.Header>
                              <List.Description className='list_description'>
                                {child.more}
                              </List.Description>

                              <Popup
                                inverted
                                wide='very'
                                content={child.article_header}
                                trigger={
                                  <Button
                                    style={{ marginTop: '25px' }}
                                    icon='external'
                                    content='Continue Reading'
                                    as='a'
                                    href={child.article_url}
                                    target='_blank'
                                  />
                                }
                              />
                            </List.Content>
                          </List.Item>
                        </Segment>
                      );
                    })}
                  </List.List>
                </List.Item>
              );
            })}
            <br />
          </List>
        </div>
      );
    } else {
      return (
        <Container textAlign='center'>
          <br />

          <Message
            size='massive'
            negative
            icon='exclamation circle'
            header='No results found!'
            content='Try another search term'
          />
          <br />
        </Container>
      );
    }
  }
}

export default ResultsList;
