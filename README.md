# My Yelp Bookmark Map

Basically just a convenient web page to view my Yelp bookmarks. Screenshot:

![screenshot](http://i.imgur.com/LmzX9ms.png)

The motivation is, sometimes it would be great to have a context of knowing who, when and how a restaurant is recommended, rather than add a bookmark in Yelp and forget everything the next day.

So I add a **context** for each bookmark I have, along with a **review** section (honestly I just don't like adding reviews on Yelp itself :) May also need a thumbs up/down mark.

Technical parts:

0. Yes, it's in React. I know it's hipster, but hey, why not have a try just for fun :)
1. Use [Redux](https://github.com/reactjs/redux) for state management. This part deserves a blog post to talk about (essentially this app is like a variant of todo list). It also helps keep sync between the bookmark card and the pin point on map, while without Redux I it would be relatively painful to pass event handlers back and forth at the master component
2. Use [react-map-gl](https://github.com/uber/react-map-gl) open source repo from Uber
3. Tried other different UI component library for React, but have to turn back to [material-ui](http://www.material-ui.com/) (hmm, interesting)
4. Backend part
    - Talk to my [ybk](https://github.com/EDFward/ybk) service to fetch bookmarks and update notes (context/review)
    - Use MySQL, rather than a JSON file, ha, ha, ha

Calm down and go to restaurants.
