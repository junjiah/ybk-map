import React, {Component} from 'react';
import {connect} from 'react-redux';
import autobind from 'autobind-decorator';

import {selectBookmark, mapViewportUpdate} from '../actions';
import {Visibility} from '../util';
import YelpMap from '../components/yelp-map.jsx';

class MapConainer extends Component {

  componentDidMount() {
    this._onChangeViewport({
      width: window.innerWidth,
      height: window.innerHeight
    });
    // Bind listeners for window resize.
    window.addEventListener('resize', this._onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._onResize);
  }

  @autobind
  _onResize() {
    this._onChangeViewport({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  @autobind
  _onChangeViewport(viewport) {
    this.props.dispatch(mapViewportUpdate(viewport));
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
  onChangeViewport: (viewport) => {
    dispatch(mapViewportUpdate(viewport));
  },
  dispatch
});

const SelectableYelpMap = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapConainer);

export default SelectableYelpMap;
