import { connect } from 'react-redux';

import YelpMap from '../components/yelp-map.jsx';

const mapStateToProps = (state) => ({
  bookmarks: state.bookmarks.map(b => ({
    id: b.id,
    location: [b.longitude, b.latitude],
  })),
  selectedBookmark: state.selected,
});

const SelectableYelpMap = connect(
  mapStateToProps
)(YelpMap);

export default SelectableYelpMap;
