import React, { useState, useEffect } from 'react';
import './VigenereCipher.css';

const VigenereCipher = () => {
  const [key, setKey] = useState('');
  const [encodedText, setEncodedText] = useState('');
  const [decodedText, setDecodedText] = useState('');

  useEffect(() => {
    setDecodedText(decrypt(encodedText, key));
  }, [key, encodedText]);

  const decrypt = (text, key) => {
    if (!key) return text;

    let result = '';
    let keyIndex = 0;
    key = key.toUpperCase();

    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (c.match(/[a-z]/i)) {
        const code = text.charCodeAt(i);
        const offset = code >= 97 ? 97 : 65;
        const keyCode = key.charCodeAt(keyIndex % key.length) - 65;
        const decodedChar = String.fromCharCode(
          ((code - offset - keyCode + 26) % 26) + offset
        );
        result += decodedChar;
        keyIndex++;
      } else {
        result += c;
      }
    }
    return result;
  };

  return (
    <div className="vigenere-cipher">
      <h1>Vigenère Cipher Decoder</h1>
      <div className="form-group">
        <label>Key:</label>
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Encoded Text:</label>
        <textarea
          value={encodedText}
          onChange={(e) => setEncodedText(e.target.value)}
        ></textarea>
      </div>
      <div className="form-group">
        <label>Decoded Text:</label>
        <textarea value={decodedText} readOnly></textarea>
      </div>
    </div>
  );
};

export default VigenereCipher;
