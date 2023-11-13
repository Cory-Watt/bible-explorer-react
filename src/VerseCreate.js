import React, { useState } from "react";
import axios from "axios";

const VerseCreate = () => {
  const [newVerse, setNewVerse] = useState({
    book: "",
    chapter: "",
    verseNumber: "",
    text: "",
  });
  const [isCreationComplete, setIsCreationComplete] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:3000/verses", newVerse)
      .then((response) => {
        setSuccessMessage(`Verse created successfully!`);
        setIsCreationComplete(true);
        // Reset the form for new input
        setNewVerse({ book: "", chapter: "", verseNumber: "", text: "" });
      })
      .catch((error) => {
        console.error("Error creating verse", error);
        setSuccessMessage("");
      });
  };

  const handleNewCreation = () => {
    setSuccessMessage("");
    setIsCreationComplete(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewVerse((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Create a New Bible Verse</h2>
      {isCreationComplete ? (
        <div>
          <p>{successMessage}</p>
          <button onClick={handleNewCreation}>Create Another Verse</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="book">Book:</label>
          <input
            type="text"
            id="book"
            name="book"
            required
            value={newVerse.book}
            onChange={handleChange}
          />

          <label htmlFor="chapter">Chapter:</label>
          <input
            type="number"
            id="chapter"
            name="chapter"
            required
            value={newVerse.chapter}
            onChange={handleChange}
          />

          <label htmlFor="verseNumber">Verse Number:</label>
          <input
            type="number"
            id="verseNumber"
            name="verseNumber"
            required
            value={newVerse.verseNumber}
            onChange={handleChange}
          />

          <label htmlFor="text">Text:</label>
          <textarea
            id="text"
            name="text"
            required
            value={newVerse.text}
            onChange={handleChange}
          ></textarea>

          <button type="submit">Create Verse</button>
        </form>
      )}
    </div>
  );
};

export default VerseCreate;
