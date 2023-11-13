import React, { useState } from "react";
import axios from "axios";

const VerseCreate = () => {
  // State for storing the new verse details
  const [newVerse, setNewVerse] = useState({
    book: "",
    chapter: "",
    verseNumber: "",
    text: "",
  });

  // State to track if creation is complete and to handle success message
  const [isCreationComplete, setIsCreationComplete] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behaviour

    // Make a POST request to create a new verse
    axios
      .post("http://localhost:3000/verses", newVerse)
      .then((response) => {
        // On successful creation, show success message and reset the form
        setSuccessMessage(`Verse created successfully!`);
        setIsCreationComplete(true);
        setNewVerse({ book: "", chapter: "", verseNumber: "", text: "" });
      })
      .catch((error) => {
        // Log and reset on error
        console.error("Error creating verse", error);
        setSuccessMessage("");
      });
  };

  // Function to reset form and states for new creation
  const handleNewCreation = () => {
    setSuccessMessage("");
    setIsCreationComplete(false);
  };

  // Function to handle input changes
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
        // Display success message and option to create another verse
        <div>
          <p>{successMessage}</p>
          <button onClick={handleNewCreation}>Create Another Verse</button>
        </div>
      ) : (
        // Verse creation form
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
