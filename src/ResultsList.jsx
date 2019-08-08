import React from 'react';
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
      Questions: questionState
    };

    console.log(this.state.Questions);
  }

  changeActive(index) {
    var questionsArray = this.state.Questions;

    if (questionsArray[index].isActive == false) {
      questionsArray[index].isActive = true;
    } else {
      questionsArray[index].isActive = false;
    }

    this.setState({ Questions: questionsArray });
  }

  render() {
    const { questions } = this.props;

    if (questions.length > 0) {
      return (
        <div>
          <List>
            {questions.map((question, index) => {
              return (
                <List.Item className="my_list_v1">
                  <List.Content>
                    <List.Header className="uppercase_header" as="h3">
                      {question.search}
                    </List.Header>

                    <List.Description className="list_description">
                      {question.more}
                    </List.Description>
                    <br />
                    <br />
                    <Button.Group size="medium">
                      <Popup
                        inverted
                        wide="very"
                        content={question.article_header}
                        trigger={
                          <Button
                            icon="external"
                            content="Continue Reading"
                            as="a"
                            href={question.article_url}
                            target="_blank"
                          />
                        }
                      />
                      <Button.Or />
                      <Button
                        onClick={() => this.changeActive(index)}
                        color="blue"
                      >
                        <Icon name="dropdown" />
                        See Related
                      </Button>
                    </Button.Group>
                  </List.Content>
                  <List.List>
                    {this.state.Questions.length > 0}
                    {question.children.map((child, childIndex) => {
                      return (
                        <Segment
                          padded
                          style={{
                            display: this.state.Questions[index].isActive
                              ? 'block'
                              : 'none'
                          }}
                        >
                          <List.Item>
                            <List.Content>
                              <List.Header className="uppercase_header" as="h4">
                                {child.search}
                              </List.Header>
                              <List.Description className="list_description">
                                {child.more}
                              </List.Description>
                              <br />

                              <Popup
                                inverted
                                wide="very"
                                content={child.article_header}
                                trigger={
                                  <Button
                                    icon="external"
                                    content="Continue Reading"
                                    as="a"
                                    href={child.article_url}
                                    target="_blank"
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
            <br />
          </List>
        </div>
      );
    } else {
      return (
        <Container textAlign="center">
          <Message
            size="large"
            negative
            icon="exclamation circle"
            header="No results found!"
            content="Try another search term"
          />
        </Container>
      );
    }
  }
}

export default ResultsList;
