import React, {Component} from 'react';
import {connect} from 'react-redux';
import autobind from 'autobind-decorator';

import {selectBookmark, mapViewportUpdate} from '../actions';
import {Visibility} from '../util';
import YelpMap from '../components/yelp-map.jsx';

class MapConainer extends Component {

  componentDidMount() {
    this._onResize();
    // Bind listeners for window resize.
    window.addEventListener('resize', this._onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._onResize);
  }

  @autobind
  _onResize() {
    this.props.onViewportChange({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  render() {
    const {mapViewport} = this.props;
    if (!mapViewport.width) {
      return null;
    }

    return (<YelpMap {...this.props} />);
  }

}

const mapStateToProps = state => ({
  bookmarks: state.bookmarks
    .filter(b => b.visible === Visibility.VISIBLE)
    .map(b => ({
      id: b.id,
      location: [b.longitude, b.latitude]
    })),
  selectedBookmark: state.selected,
  mapViewport: state.mapViewport
});

const mapDispatchToProps = dispatch => ({
  onCircleClick: (id) => {
    dispatch(selectBookmark(id));
  },
  onViewportChange: (viewport) => {
    dispatch(mapViewportUpdate(viewport));
  }
});

const SelectableYelpMap = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapConainer);

export default SelectableYelpMap;
