/* global $ */
import ReactMapGL from 'react-map-gl';
import React from 'react';
import PropTypes from 'prop-types';
import SVGOverlay from 'react-map-gl/src/overlays/svg.react';
import transform from 'svg-transform';

import Circle from './circle.jsx';
import config from '../config.js';

const mapboxApiAccessToken = config.mapboxApiAccessToken;

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
      const newViewport = Object.assign({}, this.props.mapViewport, {
        longitude: bookmark.location[0],
        latitude: bookmark.location[1]
      });
      this.props.onChangeViewport(newViewport);
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
    return (
      <ReactMapGL
        {...this.props.mapViewport}
        mapStyle={'mapbox://styles/mapbox/dark-v9'}
        mapboxApiAccessToken={mapboxApiAccessToken}
        onChangeViewport={this.props.onChangeViewport.bind(this)}>
        <SVGOverlay
          {...this.props.mapViewport}
          redraw={this._redrawSVGOverlay.bind(this)} />
      </ReactMapGL>
    );
  }

}

YelpMap.propTypes = {
  bookmarks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    location: PropTypes.array.isRequired  // [Lng, Lat].
  }).isRequired).isRequired,
  selectedBookmark: PropTypes.string,
  onCircleClick: PropTypes.func.isRequired,
  onChangeViewport: PropTypes.func.isRequired
};

export default YelpMap;
