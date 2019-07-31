import React from 'react';
class ResultsList extends React.Component {
    render() {
      const { questions } = this.props;
      console.log(this.props.questions.length)
      if (questions.length > 0) {
        return (
          <div>
            {questions.map((question, index) => {
              return (<div>
                <p>[Q{index + 1}]: {question.search}</p>
                <div>
                  Suggested Article: <a href={question.url}>TITLE TO GO HERE question.topAnswerTitle</a>
                </div>
              </div>);
            })}
          </div>
        );
      }
  
      return <div>No Results</div>;
    }
  }
  
  export default ResultsList;