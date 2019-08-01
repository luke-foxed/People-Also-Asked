import React from 'react';
import { Icon, Segment, Button, List, Popup, Message } from 'semantic-ui-react';

class ResultsList extends React.Component {
	constructor(props) {
		super(props);
		const questionState = [];
		for (let i = 0; i < props.questions.length; i++) {
			questionState.push({ isActive: false, index: i });
		}
		this.state = {
			questionState
		};
		console.log(this.state.questionState);
	}

	toggleMore = (index) => {
		console.log(this.state.questionState[index].isActive);
		const newQuestionState = this.state.questionState.splice(index, 1, {
			isActive: !this.state.questionState[index].isActive,
			index
		});
		this.setState({ questionState: newQuestionState });
	};

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
									<List.Header className="uppercase_header" as="h3">
										{question.search}
									</List.Header>
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
										<Button onClick={() => this.toggleMore(index)} color="blue">
											Show
										</Button>
									</Button.Group>
								</List.Content>
								<List.List>
									<br />
									<br />
									{this.state.questionState[index] &&
									this.state.questionState[index].isActive && (
										<Segment padded>
											{question.children.map((child, index) => {
												return (
													<div className={'child' + index}>
														<List.Item>
															<List.Content>
																<List.Header className="uppercase_header" as="h4">
																	{child.search}
																</List.Header>
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
									)}
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
