import React from 'react';
import { Icon, Segment, Button, List, Popup, Message } from 'semantic-ui-react';

class ResultsList extends React.Component {
	state = { showing: false };

	render() {
		const { questions } = this.props;
		const { showing } = this.state;

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
									<Button.Group size="medium">
										<Popup
											inverted
	
											wide="very"
											content={question.article_header}
											trigger={
												<Button
													content="Continue Reading"
													as="a"
													href={question.article_url}
													target="_blank"
												/>
											}
										/>
										<Button.Or />
										<Button onClick={() => this.setState({ showing: !showing })} color="blue">
											See Related
										</Button>
									</Button.Group>
								</List.Content>
								<List.List>
									<br />
									<br />

									<Segment padded>
										{question.children.map((child, index) => {
											return (
												<div
													className={'child' + index}
													style={{ display: showing ? 'block' : 'none' }}
												>
													<List.Item>
														<List.Content>
															<List.Header as="h4">{child.search}</List.Header>
															<List.Description>{child.more}</List.Description>
															<br />

															<Popup
                              inverted
																wide="very"
																content={child.article_header}
																trigger={
																	<Button
																		content="Continue Reading"
																		as="a"
																		href={child.article_url}
																		target="_blank"
																	/>
																}
															/>
														</List.Content>
														<br />
														<br />
													</List.Item>
												</div>
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

		return (
			<Message negative>
				<Message.Header>No results found!</Message.Header>
				<p>Try another search term</p>
			</Message>
		);
	}
}

export default ResultsList;
