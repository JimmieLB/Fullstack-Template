const mongoose = require('mongoose');
const CONNECTION = require('../getSecrets.js').CONNECTION;
const CONNECTIONPARAMS = require('../getSecrets.js').CONNECTIONPARAMS;

mongoose.connect(CONNECTION, CONNECTIONPARAMS);
// mongoose.connect('mongodb://localhost/fetcher');

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
  return Repo.insertMany(filterAllData(objs));
};

let get = (num) => {
  return Repo.find({}, null, {limit: 25, sort: { 'watchers': -1 }});
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