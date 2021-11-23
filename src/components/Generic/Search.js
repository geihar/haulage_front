import React from 'react'

const Search = () => (

  <form className="card p-2">
    <div className="input-group">
      <input type="text" className="form-control" placeholder="Find shipping" />
      <div className="input-group-append">
        <button type="submit" className="btn btn-secondary">Find</button>
      </div>
    </div>
  </form>
)

export default Search
