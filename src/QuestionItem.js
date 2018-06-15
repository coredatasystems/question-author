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
    const { id, question, correct_answer, incorrect_answers, image, tags } = this.props;
    const { open } = this.state;

    return (
      <li className="question-item">
        <span className="question-item-toggle" onClick={ this.toggleExpand }>{ open ? '▼' : '▶' }</span> <span>{ question }</span>
        {open && (
          <ul>
            <li><strong>Correct answer:</strong> { correct_answer }</li>
            <li><strong>Incorrect answers:</strong> { incorrect_answers }</li>
            <li><strong>Tags:</strong> { tags }</li>
            {image && image.length > 0 &&
              <li>
                <strong>Images:</strong>
                {image.split(',').map(src => <img src={`/uploads/${ src }`}/>)}
              </li>
            }
            <form method="POST" encType="multipart/form-data" action="addImage.php">
              <input type="hidden" name="question_id" value={ id } />
              <div className="form-group">
                <label htmlFor={ `question_${ id }_image` }>Add image:</label>
                <input name="image" type="file" className="form-control" id={ `question_${ id }_image` } aria-describedby={ `question_${ id }_image` } />
                <button type="submit">Update</button>
              </div>
            </form>
          </ul>
        )}
      </li>
    );
  }
}

export default QuestionItem;
