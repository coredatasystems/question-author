import React from 'react';

class TagFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.toggleOpen = this.toggleOpen.bind(this);
  }

  toggleOpen() {
    this.setState(state => ({ open: !state.open }));
  }

  render() {
    return (
      <div>
        <div onClick={this.toggleOpen} className="badge badge-primary filter-badge">Filter</div>
        {this.state.open && (
          <div className="filter-container">
            {this.props.tags.map(({ tag, enabled, toggleEnabled }) => (
              <span className="tag-filter-checkbox" key={tag}>
                <input id={tag} key={tag} type="checkbox" checked={enabled} onChange={toggleEnabled} />
                <label htmlFor={tag}>{tag}</label>
              </span>
            ))}
            <div className="filter-all-checkboxes">
              <button className="btn btn-dark" onClick={this.props.toggleAll}>Toggle all tags</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default TagFilter;