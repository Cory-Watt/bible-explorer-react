import React, { useState } from 'react';
import axios from 'axios';

const ListVerse = () => {
  const [book, setBook] = useState('');
  const [chapter, setChapter] = useState('');
  const [verses, setVerses] = useState([]);

  const isFormValid = () => {
    return book && chapter;
  };

  const onSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submit action
    if (isFormValid()) {
      axios.get(`http://localhost:3000/books/${book}/chapters/${chapter}/verses`)
        .then(response => {
          setVerses(response.data);
        })
        .catch(error => console.error('Error fetching verses', error));
    }
  };

  return (
    <div>
      <h2>List of Bible Verses</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="book">Book:</label>
        <input 
          type="text" 
          id="book" 
          name="book" 
          required 
          value={book} 
          onChange={(e) => setBook(e.target.value)}
        />

        <label htmlFor="chapter">Chapter:</label>
        <input 
          type="number" 
          id="chapter" 
          name="chapter" 
          required 
          value={chapter} 
          onChange={(e) => setChapter(e.target.value)}
        />

        <button type="submit" disabled={!isFormValid()}>Submit</button>
      </form>

      <ul>
        {verses.map((verse, index) => (
          <li key={index}>
            <p>Verse Number: {verse.verseNumber}</p>
            <p>Text: {verse.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListVerse;