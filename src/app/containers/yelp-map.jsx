import {connect} from 'react-redux';

import {selectBookmark} from '../actions';
import {Visibility} from '../util';
import YelpMap from '../components/yelp-map.jsx';

const mapStateToProps = state => ({
  bookmarks: state.bookmarks
    .filter(b => b.visible === Visibility.VISIBLE)
    .map(b => ({
      id: b.id,
      location: [b.longitude, b.latitude]
    })),
  selectedBookmark: state.selected
});

const mapDispatchToProps = dispatch => ({
  onCircleClick: (id) => {
    dispatch(selectBookmark(id));
  }
});

const SelectableYelpMap = connect(
  mapStateToProps,
  mapDispatchToProps,
)(YelpMap);

export default SelectableYelpMap;
