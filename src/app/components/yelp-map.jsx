import alphaify from 'alphaify';
import MapGL from 'react-map-gl';
import React from 'react';
import SVGOverlay from 'react-map-gl/src/overlays/svg.react';
import transform from 'svg-transform';

import config from '../config.js';

const position = [37.7841393, -122.3957547];  // SF.
const mapboxApiAccessToken = config.mapboxApiAccessToken;

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
    return Object.freeze({
      root: {
        height: '100vh',
        width: '100vw'
      },
      svgGroup: {
        pointerEvents: 'all',
        cursor: 'pointer'
      },
      circle: {
        fill: alphaify('#D81100', 0.8),
      }
    });
  }

  _redrawSVGOverlay(opt) {
    const styles = this.getStyles();
    const bookmarksPoints = this.props.bookmarks.map((b, i) => {
      return (
        <circle
          style={styles.circle}
          r={10}
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
    const viewport = Object.assign({}, this.state.viewport, this.props);
    return (
      <MapGL
        {...viewport}
        mapStyle={this.state.mapStyle}
        mapboxApiAccessToken={mapboxApiAccessToken}
        ignoreEmptyFeatures={false}
        onChangeViewport={ (viewport) => this.setState({viewport}) }>
        <SVGOverlay
          {...viewport}
          redraw={this._redrawSVGOverlay.bind(this)} />
      </MapGL>
    );
  }

}

YelpMap.propTypes = {
  bookmarks: React.PropTypes.array.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
}

export default YelpMap;
