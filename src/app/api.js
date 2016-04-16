import config from './config.js';

const url = config.debug ?
    'http://localhost:8080/Request.php?' : '/slack/Request.php?';

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

  postNote({id, note}, done, fail) {
    $.ajax({
      type: 'POST',
      url,
      data: `id=${id}&note=${note}`,
      dataType: 'text',
      crossDomain: true,
    }).done(done).fail(fail);
  },
});

export default api;
