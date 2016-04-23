import config from './config.js';

const url = config.endpoint;
const api = Object.freeze({
  getBookmarks(done, fail) {
    $.ajax({
      type: 'GET',
      url: `${url}json=bookmarks`,
      dataType: 'json',
      crossDomain: true,
    }).done(result => done(result)).fail(fail);
  },

  getNotes(done, fail) {
    $.ajax({
      type: 'GET',
      url: `${url}json=notes`,
      dataType: 'json',
      crossDomain: true,
    }).done(result => done(result)).fail(fail);
  },

  editNote({id, contentType, content}, done, fail) {
    $.ajax({
      type: 'POST',
      url,
      data: `id=${id}&type=${contentType}&content=${content}`,
      dataType: 'text',
      crossDomain: true,
    }).done(done).fail(fail);
  },
});

export default api;
