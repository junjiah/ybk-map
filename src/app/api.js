/* global $ */
import config from './config.js';

const url = config.endpoint;
const api = Object.freeze({
  getBookmarks() {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'GET',
        url: `${url}json=bookmarks`,
        dataType: 'json',
        crossDomain: true
      }).done(resolve).fail(reject);
    });
  },

  getNotes() {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'GET',
        url: `${url}json=notes`,
        dataType: 'json',
        crossDomain: true
      }).done(resolve).fail(reject);
    });
  },

  editNote({id, contentType, content}) {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'POST',
        url,
        data: `id=${id}&type=${contentType}&content=${content}`,
        dataType: 'text',
        crossDomain: true
      }).done(resolve).fail(reject);
    });
  }
});

export default api;
