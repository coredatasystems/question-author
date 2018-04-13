import React from 'react';

const FormGroup = ({ label, name, onFocus }) => (
  <div className="form-group">
    <label htmlFor={ name }>{ label }</label>
    <input name={ name } onFocus={ onFocus } type="text" className="form-control" id={ name } aria-describedby={ name } />
  </div>
);

const FileInput = ({ label, name }) => (
  <div className="form-group">
    <label htmlFor={ name }>{ label }</label>
    <input name={ name } type="file" className="form-control" id={ name } aria-describedby={ name } />
  </div>
);

class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      incorrectAnswers: 1,
      activeInput: null,
    };
    this.onInputFocus = this.onInputFocus.bind(this);
    this.handleAddAnswer = this.handleAddAnswer.bind(this);
    this.handleRemoveAnswer = this.handleRemoveAnswer.bind(this);
    this.handleCharacterPress = this.handleCharacterPress.bind(this);
    this.unicodeCharacters = '⁰ ¹ ² ³ ⁴ ⁵ ⁶ ⁷ ⁸ ⁹ ⁺ ⁻ ⁼ ⁽ ⁾ ₀ ₁ ₂ ₃ ₄ ₅ ₆ ₇ ₈ ₉ ₊ ₋ ₌ ₍ ₎'.split(' ');
  }

  onInputFocus(e) {
    this.setState({
      activeInput: e.target,
    });
  }

  handleCharacterPress(character) {
    if (this.state.activeInput) {
      this.state.activeInput.value = (this.state.activeInput.value || '') + character;
    }
  }

  handleAddAnswer(e) {
    e.preventDefault();
    this.setState(state => ({
      incorrectAnswers: state.incorrectAnswers + 1,
    }));
  }

  handleRemoveAnswer(e) {
    e.preventDefault();
    this.setState(state => ({
      incorrectAnswers: state.incorrectAnswers - 1,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();

    Array.from(e.target.getElementsByTagName('input')).forEach(input => {
      input.setAttribute('value', input.value);
    });

    e.target.submit();
  }

  render() {
    return (
      <div className="row question-form">
        <div className="col-4">
          { this.unicodeCharacters.map(c => (
            <button key={ c } onClick={ () => this.handleCharacterPress(c) } className="btn btn-light">{ c }</button>
          ))}
        </div>
        <div className="col-8">
          <div className="container">
            <form method="POST" action="handleSubmit.php" onSubmit={this.handleSubmit}>
              <FormGroup onFocus={ this.onInputFocus } label="Question" name="question" />
              <FormGroup onFocus={ this.onInputFocus } label="Correct Answer" name="correct_answer" />
              {
                Array.from({ length: this.state.incorrectAnswers }).map((n, index) => (
                  <FormGroup onFocus={ this.onInputFocus } key={ index } label="Incorrect Answer" name="incorrect_answers[]" />
                ))
              }
              <button onClick={ this.handleAddAnswer } className="btn btn-success btn-add-answer">Add Answer</button>
              <button onClick={ this.handleRemoveAnswer } className="btn btn-danger btn-add-answer">Remove Answer</button>
              <FileInput name="image" label="Upload image" />
              <FormGroup label="Add tags" name="tags" />
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
};

export default QuestionForm;
