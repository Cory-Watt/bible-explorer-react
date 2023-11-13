import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importing components to be used in the routes
import ListVerse from './ListVerse';
import VerseSearch from './VerseSearch';
import VerseCreate from './VerseCreate';
import DeleteVerse from './DeleteVerse';
import VerseEdit from './VerseEdit';
import Navbar from './Navbar';
import './Styles.css'; // Importing global styles for the app

function App() {
    return (
      // Setting up the Router for handling navigation within the app
      <Router>
        <div>
          {/* Navbar component displayed on all pages */}
          <Navbar />
          {/* Routes define the path and corresponding component to render */}
          <Routes>
            {/* Route for the home page, showing a list of verses */}
            <Route path="/" element={<ListVerse />} />
            {/* Route for searching verses */}
            <Route path="/search" element={<VerseSearch />} />
            {/* Route for creating a new verse */}
            <Route path="/create" element={<VerseCreate />} />
            {/* Route for editing an existing verse - expects an ID parameter */}
            <Route path="/edit" element={<VerseEdit />} />
            {/* Route for deleting a verse - expects an ID parameter */}
            <Route path="/delete" element={<DeleteVerse />} />
            {/* Additional routes can be added here as needed */}
          </Routes>
        </div>
      </Router>
    );
}

export default App; // Exporting App component for use in index.js