import React from 'react';

import QuestionItem from './QuestionItem';

class QuestionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
    }
  }

  componentDidMount() {
    fetch('getQuestions.php')
      .then(response => response.json())
      .then(questions => {
        console.log(questions);
        this.setState({ questions });
      })
  }

  render() {
    return (
      <div className="question-list-container">
        <h3>Existing Questions:</h3>
        <ul className="question-list">
          {this.state.questions.map(question => (
            <QuestionItem { ...question } />
          ))}
        </ul>
      </div>
    );
  }
}

export default QuestionList;
