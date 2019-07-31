import React from 'react';
import { Icon, Segment, Button, List, Popup, Label } from 'semantic-ui-react';

class ResultsList extends React.Component {
	render() {
		const { questions } = this.props;
		console.log(this.props.questions.length);
		if (questions.length > 0) {
			return (
				<div>
					{questions.map((question, index) => {
						return (
							<List.Item className="my_list_v1">
								<List.Content>
									<List.Header as="h3">{question.search}</List.Header>
									<List.Description>{question.more}</List.Description>
									<br />
									<List.Description>
										<Button.Group size="medium">
											<Popup
												content="INSERT ARTICLE TITLE"
												trigger={
													<Button
														content="Continue Reading"
														as="a"
														href={question.url}
														target="_blank"
													/>
												}
											/>
											<Button.Or />
											<Button color="blue">See Related</Button>
										</Button.Group>
									</List.Description>
								</List.Content>
								<List.List>
									<Segment padded>
										{question.children.map((child, index) => {
											return (
												<List.Item>
													<List.Content>
														<List.Header as='h4'>{child.search}</List.Header>
                            <List.Description>{child.more}
                            
                            </List.Description>
														<br />
											
															<Button
                              size='small'
															as="a"
															href={child.url}
                              target="_blank"
															basic color="blue"
															>
																Contine Reading &nbsp;
																<Icon name="long arrow alternate right" />
															</Button>

													
													</List.Content>
                          <br />
                        <br />
												</List.Item>
                    
											);
										})}
									</Segment>
								</List.List>
							</List.Item>
						);
					})}
				</div>
			);
		}

		return <div>No Results</div>;
	}
}

export default ResultsList;
