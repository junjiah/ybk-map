import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import TextField from 'material-ui/lib/text-field';

class BookmarkItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    };
  }

  getStyles() {
    let styles = {
      card : {
        padding: '10px 20px',
        borderTop: '1px solid #f2f2f2',
        marginBottom: '10px',
      },
      restaurantName: {
        marginTop: '10px',
        marginBottom: '10px',
      },
      categories: {
        color: 'grey',
      },
      rating: {
        fontWeight: 'bold',
        marginLeft: '10px',
      },
      editNoteButton: {
        float: 'right!important',
      },
      saveNoteButton: {
        border: 'none',
        marginTop: '11px',
        paddingLeft: '6px',
        paddingRight: '10px',
      },
      note: {
        whiteSpace: "pre-wrap",
        fontSize: '16px',
      },
      link: {
        color: '#8F8F8F',
        textDecoration: 'none',
        transition: 'color 200ms ease-in-out',
      },
    };
    if (this.props.selected) {
      styles.card.transform = 'translate3d(-20px, -0px, 0px)';
    }
    return Object.freeze(styles);
  }

  componentDidUpdate() {
    if (this.props.selected) {
      // Scroll to the current selected item if not in view.
      let $ele = $(ReactDOM.findDOMNode(this));
      let $container = $ele.parent();

      let scrollTop = $ele.offset().top - $container.offset().top;
      scrollTop += $container.scrollTop();
      // Scroll to the middle.
      scrollTop -= (window.innerHeight / 2 - $ele.height() / 2);

      $container.animate({
        scrollTop
      }, 250);
    }
  }

  _onClickCard(e) {
    // Ignore if during editing when selected.
    if (this.state.isEditing && this.props.selected) {
      return;
    }
    this.props.onClick();
  }

  _onClickEditButton(e) {
    // Do not toggle selection if already selected.
    if (this.props.selected) {
      e.stopPropagation();
    }
    this.setState({isEditing: true});
  }

  _onNoteSaved(e) {
    // Do not affect 'selected' property.
    e.stopPropagation();
    const newNoteContent = this.refs.editNoteInput.getValue();
    this.setState({isEditing: false});
    this.props.onNoteSaved(this.props.id, newNoteContent);
  }

  render() {
    const styles = this.getStyles();

    let note;
    if (this.state.isEditing) {
      note = (
        <div>
          <TextField
            ref="editNoteInput"
            id={this.props.id}
            defaultValue={this.props.note}
            fullWidth={true}
            multiLine={true} />
          <button
            type="button"
            className="btn btn-default"
            aria-label="Save Note"
            style={styles.saveNoteButton}
            onClick={this._onNoteSaved.bind(this)}>
            <span className="glyphicon glyphicon-send" aria-hidden="true"></span>
          </button>
        </div>
      );
    } else {
      note = (<p style={styles.note}>{this.props.note}</p>);
    }

    return (
      <Card
        style={styles.card}
        onClick={this._onClickCard.bind(this)}
        // Use CSS hover trict to display edit button.
        className="bookmark-card">
        <button
          type="button"
          // Only display when hovering over the card.
          className="btn btn-default edit-note-button"
          aria-label="Edit Note"
          style={styles.editNoteButton}
          onClick={this._onClickEditButton.bind(this)}>
          <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
        </button>
        <h3 style={styles.restaurantName}>
          { /* Add class name to handle ':hover' pseudo class. */}
          <a href={this.props.url} target="_blank" style={styles.link} className="link">
            {this.props.name}
          </a>
        </h3>
        <p style={styles.categories}>
          { this.props.categories.join(', ') }
          <span style={styles.rating}>
            {this.props.rating}
          </span>
        </p>
        {note}
      </Card>
    )
  }
}

BookmarkItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  rating: PropTypes.number.isRequired,
  selected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  note: PropTypes.string.isRequired,
  onNoteSaved: PropTypes.func.isRequired,
};

export default BookmarkItem;
