import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DeleteVerse = () => {
  // State for storing the verse ID and success message
  const [verseId, setVerseId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Hooks for navigation and accessing URL parameters
  const navigate = useNavigate();
  const params = useParams();

  // Effect to set verseId from URL parameters
  useEffect(() => {
    if (params.verseId) {
      setVerseId(parseInt(params.verseId, 10));
    }
  }, [params.verseId]);

  // Function to handle verse deletion
  const onDelete = () => {
    if (verseId !== null) {
      axios.delete(`http://localhost:3000/verses/${verseId}`)
        .then(() => {
          // Set success message on successful deletion
          setSuccessMessage(`Verse with ID ${verseId} deleted successfully.`);
        })
        .catch(error => {
          // Log and reset on error
          console.error('Error deleting verse', error);
          setSuccessMessage('');
        });
    }
  };

  // Function to reset component for a new delete action
  const onNewDelete = () => {
    setSuccessMessage('');
    setVerseId(null);
  };

  // Function to navigate back to the home page
  const onCancel = () => {
    navigate('/');
  };

  return (
    <div>
      <h2>Delete Bible Verse</h2>
      <div>
        <label htmlFor="verseId">Verse ID:</label>
        <input 
          type="text" 
          id="verseId" 
          name="verseId" 
          value={verseId || ''} 
          onChange={(e) => setVerseId(e.target.value)}
        />
      </div>
      {successMessage && (
        <div>
          <p>{successMessage}</p>
          <button onClick={onNewDelete}>Delete Another Verse</button>
        </div>
      )}
      <p>Are you sure you want to delete this verse?</p>
      <button onClick={onDelete} disabled={!!successMessage}>Delete</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default DeleteVerse;