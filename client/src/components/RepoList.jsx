import React from 'react';

const Repo = ({repo}) => {
  return (
    <a className="repo_list_item" href={repo.link} target="_blank">
      <div>
        <img src={repo.avatar}/>
      </div>
      <div className="repo_list_info">
        <div>{repo.username}</div>
        <div>{repo.title}</div>
      </div>
      <div className="repo_list_info3">
        <div>{repo.description}</div>
      </div>
      <div className="repo_list_info2">
        <div>{repo.watchers}</div>
      </div>
    </a>
  )
}

const RepoList = ({ repos }) => (

  <div className="repo_list">
    {
      repos.map((repo, i) =>
        <Repo key={i} repo={repo}/>
      )
      // console.log('hello')
    }
  </div>
)

export default RepoList;