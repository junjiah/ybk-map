import MapGL from 'react-map-gl';
import React, { PropTypes } from 'react';
import SVGOverlay from 'react-map-gl/src/overlays/svg.react';
import transform from 'svg-transform';

import Circle from './circle.jsx';
import config from '../config.js';

const position = [37.7841393, -122.3957547];  // SF.
const mapboxApiAccessToken = config.mapboxApiAccessToken;
const screen = {
  width: window.innerWidth,
  height: window.innerHeight + 10,  // Hard code 10 more px for sidebar.
};

class YelpMap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: position[0],
        longitude: position[1],
        zoom: 13,
        startDragLngLat: null,
        isDragging: false,
      },
      // TODO: configurable.
      mapStyle: 'https://d30a60ek4m0pd6.cloudfront.net/mapdisplay-assets/stylesheet/stylesheet.json.gz',
    };
  }

  getStyles() {
    return {
      svgGroup: {
        pointerEvents: 'all',
        cursor: 'pointer',
      },
    };
  }

  _redrawSVGOverlay(opt) {
    const styles = this.getStyles();
    const bookmarksPoints = this.props.bookmarks.map((b, i) => {
      return (
        <Circle
          selected={b.id === this.props.selectedBookmark}
          transform={transform([{translate: opt.project(b.location)}])}
          key={i} />
      );
    });

    return (
      <g style={styles.svgGroup}>
        {bookmarksPoints}
      </g>
    );
  }

  render() {
    const styles = this.getStyles();
    const viewport = Object.assign({}, this.state.viewport, screen);
    return (
      <MapGL
        {...viewport}
        mapStyle={this.state.mapStyle}
        mapboxApiAccessToken={mapboxApiAccessToken}
        onChangeViewport={ (vp) => this.setState({viewport: vp}) }>
        <SVGOverlay
          {...viewport}
          redraw={this._redrawSVGOverlay.bind(this)} />
      </MapGL>
    );
  }

}

YelpMap.propTypes = {
  bookmarks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    location: PropTypes.array.isRequired,  // [Lng, Lat].
  }).isRequired).isRequired,
  selectedBookmark: PropTypes.string,
};

export default YelpMap;
