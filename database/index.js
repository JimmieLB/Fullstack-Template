const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  title: 'String',
  watchers: 'Number',
  link: 'String',
  username: 'String',
  avatar: 'String',
  description: 'String'
  // TODO: your schema here!
});

let Repo = mongoose.model('Repo', repoSchema);

let filterData = function(data) {
  let schema = {
    username: 'Unknown',
    title: 'Unknown',
    watchers: 0,
    link: 'Unknown',
    avatar: '',
    description: ''
  }

  schema.username = data.owner.login;
  schema.title = data.name;
  schema.link = data.html_url;
  schema.watchers = data.watchers_count;
  schema.avatar = data.owner.avatar_url;
  schema.description = data.description;

  return schema;
}

let filterAllData = function(data) {
  let output = [];
  for (let i = 0; i < data.length; i++) {
    output.push(filterData(data[i]));
  }
  return output;
}

let save = (objs) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  console.log('Save attempt');
  return new Promise((resolve, reject) => {
    Repo.create(filterAllData(objs)).then((data) => {
      console.log('OBJ CREATED', objs);
      resolve();
    }).catch((err) => {
      reject(err);
    });
  });
};

let get = (num) => {
  return new Promise((resolve, reject) => {
    Repo.find({}, null, {limit: 25}).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
    });
  });
};

let reset = () => {
  // * DELETE ALL
  Repo.remove({}, (data) => {
    console.log("DATA", data);
  });
}

module.exports.save = save;
module.exports.get = get;
module.exports.reset = reset;