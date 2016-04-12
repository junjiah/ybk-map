import alphaify from 'alphaify';
import React, { PropTypes } from 'react';

class Circle extends React.Component {

  getStyles() {
    return {
      unselected: {
        fill: alphaify('#D81100', 0.6),
      },
      selected: {
        fill: '#DB1100',
      },
    }
  }

  render() {
    const styles = this.getStyles();
    let style, radius;
    if (this.props.selected) {
      style = styles.selected;
      radius = 15;
    } else {
      style = styles.unselected;
      radius = 10;
    }

    return (
      <circle
        style={style}
        r={radius}
        onClick={this.props.onClick}
        transform={this.props.transform} />
    );
  }

}

Circle.propTypes = {
  transform: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default Circle;
