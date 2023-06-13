import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import Request from './parse.js';

const App = () => {

  const [repos, setRepos] = useState([]);

  let refresh = () => {
    Request.get().then((data) => {
      setRepos(data);
    }).catch((err) => {
      console.error(err);
    });
  };

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    let interval = setInterval(() => {
      refresh();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const search = (term) => {
    console.log(`${term} was searched`);
    Request.post('repos', term).then((data) => {
      console.log(data);
      refresh();
    }).catch((err) => {
      console.error(err);
    });
  }

  return (
    <div className="container">
      <h1>Github Fetcher</h1>
      <Search onSearch={search}/>
      <RepoList repos={repos}/>
    </div>
  );
}


var link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'css/style.css';
document.getElementsByTagName('HEAD')[0].appendChild(link);

ReactDOM.render(<App />, document.getElementById('app'));