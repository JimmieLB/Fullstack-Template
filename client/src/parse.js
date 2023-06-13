import $ from 'jquery';

const url = 'http://localhost:1128/';
let Request = {
  url: 'http://localhost:1128/',

  get: function(url){
    return new Promise((resolve, reject) => {
      $.ajax({
        url: 'http://localhost:1128/repos',
        type: 'GET',
        success: (data) => {
          resolve(data);
        },
        error: (err) => {
          reject(err);
        }
      });
    });
  },

  post: function(path, term){
    return new Promise((resolve, reject) => {
      $.ajax({
        url: url + path,
        type: 'POST',
        data: JSON.stringify({ term: term }),
        contentType: 'application/json',
        success: (data) => {
          resolve(data);
        },
        error: (err) => {
          reject(err);
        }
      });
    });
  }
}

export default Request;