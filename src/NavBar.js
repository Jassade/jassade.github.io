import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => (
  <div className="navbar">
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/tools">Tools</Link>
        <ul>
          <li>
            <Link to="/tools/vigenere-cipher">Vigenère Cipher</Link>
          </li>
          <li>
            <Link to="/tools/number-to-ascii">Number to ASCII Converter</Link>
          </li>
          {/* Future tools can be added here */}
        </ul>
      </li>
    </ul>
  </div>
);

export default NavBar;
