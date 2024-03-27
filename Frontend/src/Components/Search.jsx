import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
//import Spinner from '../Spinnerloader/Spinner'

const Search = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const initialQuery = queryParams.get('query');
  const [query, setQuery] = useState(initialQuery);

  // Update the query state when the search query changes
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  // Handle input change to update the query state
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  // Perform search using the query

  return (
    <div style={{paddingTop:"250px", paddingLeft:'50px'}} >
      <h2>Search Results for: {query}</h2>
      {/* Display search results */}
      <form   >
      <input type="Search" name="search" pattern=".*\S.*" required  autoComplete="off" Value={query}  onChange={handleInputChange} />
      </form>

      {/* <Spinner/> */}
    </div>
  );
};

export default Search;
