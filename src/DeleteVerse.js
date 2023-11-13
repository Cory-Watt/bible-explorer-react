import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DeleteVerse = () => {
  const [verseId, setVerseId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params.verseId) {
      setVerseId(parseInt(params.verseId, 10));
    }
  }, [params.verseId]);

  const onDelete = () => {
    if (verseId !== null) {
      axios.delete(`http://localhost:3000/verses/${verseId}`)
        .then(() => {
          setSuccessMessage(`Verse with ID ${verseId} deleted successfully.`);
          // Optionally reset the verseId here if you want the user to enter a new one
        })
        .catch(error => {
          console.error('Error deleting verse', error);
          setSuccessMessage(''); // Reset success message in case of error
        });
    }
  };

  const onNewDelete = () => {
    setSuccessMessage(''); // Clear the success message
    setVerseId(null); // Reset the verseId for new input
  };

  const onCancel = () => {
    navigate('/'); // Navigate to the home route
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