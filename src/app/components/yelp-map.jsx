import MapGL from 'react-map-gl';
import React from 'react';

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
      }
    };
  }

  getStyles() {
    return Object.freeze({
      root: {
        height: '100vh',
        width: '100vw'
      }
    });
  }

  render() {
    const styles = this.getStyles();
    // Hard code 10 more px considering the overflowed sidebar.
    const height = window.innerHeight + 10;
    return (
      <MapGL
        {...this.state.viewport}
        mapStyle={'https://d30a60ek4m0pd6.cloudfront.net/mapdisplay-assets/stylesheet/stylesheet.json.gz'}
        width={window.innerWidth}
        height={height}
        mapboxApiAccessToken={mapboxApiAccessToken}
        ignoreEmptyFeatures={false}
        onChangeViewport={ (viewport) => this.setState({viewport}) } />
    );
  }

}

export default YelpMap;
