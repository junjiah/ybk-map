import React from 'react';
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

  render() {
    const styles = this.getStyles();
    return (
      <Card style={styles.card}>
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
  id: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
  categories: React.PropTypes.array.isRequired,
  rating: React.PropTypes.number.isRequired,
  selected: React.PropTypes.bool,
};

export default BookmarkItem;
