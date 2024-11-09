import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';
import Tools from './Tools';
import VigenereCipher from './VigenereCipher';
import NumberToAscii from './NumberToAscii';
import './App.css';

function App() {
  return (
    <div className="app">
      <NavBar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/tools/vigenere-cipher" element={<VigenereCipher />} />
          <Route path="/tools/number-to-ascii" element={<NumberToAscii />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;