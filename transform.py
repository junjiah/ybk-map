#!/usr/bin/python

import json
import sys

# For simplicity, no error or warning, just try its best.
  
if __name__ == '__main__':

  bookmark_file = sys.argv[1] if len(sys.argv) > 1 else '../slack/data/bookmarks.json'
  bookmarks = json.load(file(bookmark_file))
  
  geo_dict = { 'type': 'FeatureCollection' }
  
  def transform(bookmark):
    res = { 'type': 'Feature' }
    res['geometry'] = {
      'type': 'Point',
      'coordinates': [bookmark['longitude'], bookmark['latitude']],
    }
    res['properties'] = {
      'name': bookmark['name'],
      'categories': ', '.join(bookmark['categories']),
      'rating': bookmark['rating'],
      'url': bookmark['url'],
      'marker-color': '#D00000',
    }
    return res
  
  geo_features = map(transform, bookmarks)
  geo_dict['features'] = geo_features
  
  with open('bookmarks.geojson', 'w') as outfile:
    json.dump(geo_dict, outfile)   
