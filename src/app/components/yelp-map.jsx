/* global $ */
import MapGL from 'react-map-gl';
import React, {PropTypes} from 'react';
import SVGOverlay from 'react-map-gl/src/overlays/svg.react';
import transform from 'svg-transform';

import Circle from './circle.jsx';
import config from '../config.js';

const position = [37.7841393, -122.3957547];  // SF.
const mapboxApiAccessToken = config.mapboxApiAccessToken;
const screen = {
  width: window.innerWidth,
  height: window.innerHeight + 10  // Hard code 10 more px for sidebar.
};

// From http://stackoverflow.com/a/7557433/2849480
function inViewport($ele) {
  const rect = $ele.get(0).getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= $(window).height() &&
      // TODO: hard code the width of bookmark list to avoid overlapping.
      rect.right <= $(window).width() - 500
  );
}

class YelpMap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: position[0],
        longitude: position[1],
        zoom: 13,
        startDragLngLat: null,
        isDragging: false
      },
      // TODO: configurable.
      mapStyle: 'mapbox://styles/mapbox/dark-v9'
    };
  }

  componentWillReceiveProps(nextProps) {
    const newSelectedId = nextProps.selectedBookmark;
    // Also need to check `newSelectedId` is not null.
    if (newSelectedId && newSelectedId !== this.props.selectedBookmark) {
      if (inViewport($(`#${newSelectedId}`))) {
        // Already in view port, do nothing.
        return;
      }

      // Another bookmark outside current viewport selected.
      const bookmark = this.props.bookmarks.find(b => b.id === newSelectedId);
      const newViewport = Object.assign({}, this.state.viewport, {
        longitude: bookmark.location[0],
        latitude: bookmark.location[1]
      });
      this.setState({
        viewport: newViewport
      });
    }
  }

  getStyles() {
    return {
      svgGroup: {
        pointerEvents: 'all',
        cursor: 'pointer'
      }
    };
  }

  _redrawSVGOverlay(opt) {
    const styles = this.getStyles();
    const bookmarksPoints = this.props.bookmarks.map((b, i) => {
      return (
        <Circle
          id={b.id}
          selected={b.id === this.props.selectedBookmark}
          transform={transform([{translate: opt.project(b.location)}])}
          onClick={() => this.props.onCircleClick(b.id)}
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
    location: PropTypes.array.isRequired  // [Lng, Lat].
  }).isRequired).isRequired,
  selectedBookmark: PropTypes.string,
  onCircleClick: PropTypes.func.isRequired
};

export default YelpMap;
