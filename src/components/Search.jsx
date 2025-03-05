import React from 'react'

const Search = ({ searchTerm, setSearchTerm }) => (
  <div className="search">
    <div>
      <img src='../../public/search.png' alt="search"/>
      <input
        type="text"
        placeholder={'Search through thousands of films '}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

    </div>

  </div>
)

export default Search