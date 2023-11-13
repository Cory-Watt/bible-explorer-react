import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your components here
import ListVerse from './ListVerse';
import VerseSearch from './VerseSearch';
import VerseCreate from './VerseCreate';
import DeleteVerse from './DeleteVerse';
import VerseEdit from './VerseEdit';
import Navbar from './Navbar';
import './Styles.css';


function App() {
    return (
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<ListVerse />} />
            <Route path="/search" element={<VerseSearch />} />
            <Route path="/create" element={<VerseCreate />} />
            <Route path="/edit" element={<VerseEdit />} />
            <Route path="/delete" element={<DeleteVerse />} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </Router>
    );
  }
  
  export default App;