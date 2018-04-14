import React from 'react';

class QuestionItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };

    this.toggleExpand = this.toggleExpand.bind(this);
  }

  toggleExpand() {
    this.setState(state => ({
      open: !state.open,
    }))
  }

  render() {
    const { question, correct_answer, incorrect_answers, tags } = this.props;
    const { open } = this.state;

    return (
      <li className="question-item">
        <span className="question-item-toggle" onClick={ this.toggleExpand }>{ open ? '▼' : '▶' }</span> <span>{ question }</span>
        {open && (
          <ul>
            <li><strong>Correct answer:</strong> { correct_answer }</li>
            <li><strong>Incorrect answers:</strong> { incorrect_answers }</li>
            <li><strong>Tags:</strong> { tags }</li>
          </ul>
        )}
      </li>
    );
  }
}

export default QuestionItem;
