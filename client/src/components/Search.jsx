import React, { useState } from 'react';

const Search = ({ onSearch }) => {

  const[term, setTerm] = useState('')

  const onChange = (e) => {
    setTerm(e.target.value);
  }

  const search = () => {
    onSearch(term);
  }

  return (
    <div>
      <h4>Add more repos!</h4>
      <input value={term} onChange={onChange} placeholder="Github Username" onKeyDown={(event) => {
        if (event.key === 'Enter') {
          search(term);
          setTerm('');
        }
      }}/>
      {/* <button onClick={search}> Add Repos </button> */}
    </div>
  );
}

export default Search;