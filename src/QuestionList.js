import React from 'react';

import QuestionItem from './QuestionItem';
import TagFilter from './TagFilter';

const normalizeQuestionsByTag = (questions) => (
  questions.reduce((tags, question) => {                // Reduce questions into an array of tags.
    if (!question.tags) question.tags = 'untagged';
    question.tags.split(',')                            // 1. Split comma separated tags.
      .map(tag => tag.trim())                           // 2. Trim whitespace from each tag.
      .forEach(tag => {                                 // 3. Check each tag,
        if (Object.keys(tags).indexOf(tag) === -1) {    //    if it's not in the map,
          tags[tag] = [question];                       //    add it, and add question.
        } else {
          tags[tag].push(question);                     //    If it is in the map, just add question.
        }
      });
  return tags;                                          // 4. Return the amended array of tags.
  }, {})
);

class QuestionList extends React.Component {
  constructor(props) {
    super(props);
    const cachedHiddenTags = window.localStorage.getItem('hiddenTags');
    const initialHiddenTags = cachedHiddenTags && JSON.parse(cachedHiddenTags);

    this.state = {
      questions: [],
      hiddenTags: initialHiddenTags || [],
    };
    this.toggleTag = this.toggleTag.bind(this);
    this.toggleAllTags = this.toggleAllTags.bind(this);
  }

  componentDidMount() {
    fetch('http://science.coredatasystems.co.uk/question_author/getQuestions.php')
      .then(response => response.json())
      .then(questions => {
        this.setState({ questions });
      })
  }

  toggleAllTags() {
    const questionsByTag = normalizeQuestionsByTag(this.state.questions);
    const allTags = Object.keys(questionsByTag);

    this.setState(
      ({ hiddenTags: tags }) => {
        if (tags.length > 0) return { hiddenTags: [] };
        return { hiddenTags: allTags };
      },
      () => window.localStorage.setItem('hiddenTags', JSON.stringify(this.state.hiddenTags))
    );
  }

  toggleTag(tag) {
    this.setState(({ hiddenTags: tags }) => {
      const tagIndex = tags.indexOf(tag);

      return {
        hiddenTags: tagIndex > -1
          ? [...tags.slice(0, tagIndex), ...tags.slice(tagIndex + 1)]
          : [...tags, tag]
      };
    }, () => window.localStorage.setItem('hiddenTags', JSON.stringify(this.state.hiddenTags)));
  }

  render() {
    const hiddenTags = this.state.hiddenTags;
    const questionsByTag = normalizeQuestionsByTag(this.state.questions);
    const filterTagProp = Object.keys(questionsByTag)
      .map(tag => ({
        tag,
        enabled: hiddenTags.indexOf(tag) === -1,
        toggleEnabled: () => this.toggleTag(tag),
      }));
    return (
      <div className="question-list-container">
        <h3>Existing Questions:</h3>
        <TagFilter tags={filterTagProp} toggleAll={this.toggleAllTags} />
        {Object.entries(questionsByTag)
          .filter(([tag]) => this.state.hiddenTags.indexOf(tag) === -1)
          .map(([tag, questions]) => (
          <React.Fragment key={tag}>
            <h4>{ tag }</h4>
            <ul className="question-list">
              {questions.map(question => (
                <QuestionItem key={question.id} { ...question } />
              ))}
            </ul>
          </React.Fragment>
        ))}
      </div>
    );
  }
}

export default QuestionList;
