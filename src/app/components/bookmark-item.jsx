import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Card } from 'belle';

class BookmarkItem extends React.Component {

  getStyles() {
    return {
      card : {
        padding: '10px 20px',
        borderTop: '1px solid #f2f2f2',
        marginBottom: '10px'
      },
      restaurantName: {
        marginTop: '10px',
        marginBottom: '10px'
      },
      categories: {
        color: 'grey'
      },
      rating: {
        fontWeight: 'bold'
      }
    };
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
      }, 1000);
    }
  }

  render() {
    const styles = this.getStyles();
    return (
      <Card style={styles.card} onClick={this.props.onClick}>
        <h1 style={styles.restaurantName}>
          <a href={this.props.url}>
            {this.props.name}
          </a>
        </h1>
        <p style={styles.categories}>
          { this.props.categories.join(', ') }
          <span style={styles.rating}>
            {this.props.rating}
          </span>
        </p>
        Hello I'm a bookmark.
        { this.props.selected ? 'Selected!' : '' }
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
};

export default BookmarkItem;
