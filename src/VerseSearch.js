import React, { useState } from 'react';
import axios from 'axios';

const VerseSearch = () => {
  // State for storing the search query and search results
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Function to handle the search operation
  const onSearch = (event) => {
    event.preventDefault(); // Prevent the default form submit action

    // Making a GET request to search for verses based on the search query
    if (searchQuery) {
      axios.get(`http://localhost:3000/search/${searchQuery}`)
        .then(response => {
          // Update the search results state with the response data
          setSearchResults(response.data);
        })
        .catch(error => {
          // Log error if the request fails
          console.error('Error searching verses', error);
        });
    }
  };

  return (
    <div>
      <h2>Search for Verses</h2>
      <form onSubmit={onSearch}>
        {/* Input field for the search query */}
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

      {/* Displaying search results */}
      {searchResults.length > 0 && (
        <div>
          <h3>Search Results:</h3>
          <ul>
            {/* Mapping through each verse in the search results */}
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