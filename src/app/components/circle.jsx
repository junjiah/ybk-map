import alphaify from 'alphaify';
import React from 'react';

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
        // transform={transform([{translate: opt.project(b.location)}])}
        onClick={() => console.log('clicked a circle')}
        transform={this.props.transform} />
    );
  }

}

Circle.propTypes = {
  transform: React.PropTypes.string.isRequired,
  selected: React.PropTypes.bool,
};

export default Circle;
