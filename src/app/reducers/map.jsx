const defaultViewport = {
  width: 0,
  height: 0,
  zoom: 13,
  latitude: 37.7841393,
  longitude: -122.3957547,
  isDragging: false,
  startDragLngLat: null
};

export const mapViewport = (state = defaultViewport, action) => {
  return Object.assign({}, state, action.viewport);
};
