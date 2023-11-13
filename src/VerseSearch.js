import React, { useState } from 'react';
import axios from 'axios';

const VerseSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const onSearch = (event) => {
    event.preventDefault(); // Prevent the default form submit action

    if (searchQuery) {
      axios.get(`http://localhost:3000/search/${searchQuery}`)
        .then(response => {
          setSearchResults(response.data);
        })
        .catch(error => {
          console.error('Error searching verses', error);
        });
    }
  };

  return (
    <div>
      <h2>Search for Verses</h2>
      <form onSubmit={onSearch}>
        <label htmlFor="searchQuery">Search Query:</label>
        <input 
          type="text" 
          id="searchQuery" 
          name="searchQuery" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          required
        />

        <button type="submit">Search</button>
      </form>

      {searchResults.length > 0 && (
        <div>
          <h3>Search Results:</h3>
          <ul>
            {searchResults.map((verse, index) => (
              <li key={index}>
                {verse.book} {verse.chapter}:{verse.verseNumber} - {verse.text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default VerseSearch;