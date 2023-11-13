import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerseEdit = () => {
  const [verseId, setVerseId] = useState(null);
  const [editedVerse, setEditedVerse] = useState({
    book: '',
    chapter: '',
    verseNumber: '',
    text: ''
  });
  const [isEditComplete, setIsEditComplete] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const verseIdParam = params.verseId;
    if (verseIdParam) {
      setVerseId(parseInt(verseIdParam, 10));
      // Optionally, fetch the existing verse details to edit
    }
  }, [params.verseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedVerse(prevVerse => ({
      ...prevVerse,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (verseId !== null) {
      axios.put(`http://localhost:3000/verses/${verseId}`, editedVerse)
        .then(() => {
          setSuccessMessage(`Verse with ID ${verseId} updated successfully.`);
          setIsEditComplete(true);
        })
        .catch(error => {
          console.error('Error updating verse', error);
          setSuccessMessage('');
        });
    }
  };

  const handleNewEdit = () => {
    setSuccessMessage('');
    setIsEditComplete(false);
    setEditedVerse({ book: '', chapter: '', verseNumber: '', text: '' });
    setVerseId(null);
  };

  return (
    <div>
      <h2>Edit Bible Verse</h2>
      {isEditComplete ? (
        <div>
          <p>{successMessage}</p>
          <button onClick={handleNewEdit}>Edit Another Verse</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
        <label htmlFor="verseId">Verse ID:</label>
        <input 
          type="number" 
          id="verseId" 
          name="verseId" 
          required 
          value={verseId || ''} 
          onChange={(e) => setVerseId(e.target.value)}
        />

        <label htmlFor="book">Book:</label>
        <input 
          type="text" 
          id="book" 
          name="book" 
          required 
          value={editedVerse.book} 
          onChange={handleChange}
        />

        <label htmlFor="chapter">Chapter:</label>
        <input 
          type="number" 
          id="chapter" 
          name="chapter" 
          required 
          value={editedVerse.chapter} 
          onChange={handleChange}
        />

        <label htmlFor="verseNumber">Verse Number:</label>
        <input 
          type="number" 
          id="verseNumber" 
          name="verseNumber" 
          required 
          value={editedVerse.verseNumber} 
          onChange={handleChange}
        />

        <label htmlFor="text">Text:</label>
        <textarea 
          id="text" 
          name="text" 
          required 
          value={editedVerse.text} 
          onChange={handleChange}
        ></textarea>
          <button type="submit">Save Changes</button>
        </form>
      )}
    </div>
  );
};

export default VerseEdit;