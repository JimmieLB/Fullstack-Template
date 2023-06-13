const express = require('express');
const path = require('path');
const db = require('../database/index');
const $ = require('jquery');
const apiToken = require('./config.js').GITHUB_API_KEY;
const getRepos = require('../helpers/github.js').getReposByUsername;
const { Octokit } = require('octokit');
let app = express();

const PORT = process.env.PORT || 1128

const octokit = new Octokit({
  auth: apiToken
});

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist/')));

// TODO - your code here!
// Set up static file service for files in the `client/dist` directory.
// Webpack is configured to generate files in that directory and
// this server must serve those files when requested.
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});


app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  console.log('TERM:',req.body.term);
  // octokit.request('GET /search/repositories', {
  //   q: req.body.term
  // }).then((data) => {
  getRepos(req.body.term).then((data) => {
    db.save(data.data).then(() => {
      console.log('success Stored')
      console.log(data.data.length);
    }).catch((err) => {
      console.log('ERROR', err);
    })
  }).catch((err) => {
    console.error(err);
  })
  // db.save({
  //   username: 'USERNAME',
  //   title: 'Repo name',
  //   watchers: 5,
  //   link: 'blahblahblah.com'
  // });
  res.send();
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.get(25).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.sendStatus(400);
  });
});

app.listen(PORT, function() {
  console.log(`listening on port ${PORT}`);
});

