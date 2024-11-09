// src/NumberToAscii.js
import React, { useState, useEffect } from 'react';
import './NumberToAscii.css';

const NumberToAscii = () => {
  const [inputText, setInputText] = useState('');
  const [inputType, setInputType] = useState('auto');
  const [outputText, setOutputText] = useState('');
  const [detectedType, setDetectedType] = useState('');

  useEffect(() => {
    setOutputText(convertInput(inputText, inputType));
  }, [inputText, inputType]);

  const convertInput = (text, type) => {
    if (!text.trim()) {
      setDetectedType('');
      return '';
    }

    let detectedTypeLocal = type;

    if (type === 'auto') {
      detectedTypeLocal = detectInputType(text);
      setDetectedType(detectedTypeLocal);
    } else {
      setDetectedType('');
    }

    const numbers = text.trim().split(/\s+/);
    const chars = numbers.map((numStr) => {
      let num = parseInt(numStr, getRadix(detectedTypeLocal));
      if (isNaN(num) || num < 0 || num > 65535) {
        // Replace invalid number with poop emoji
        return '💩';
      }
      return String.fromCharCode(num);
    });
    return chars.join('');
  };

  const detectInputType = (text) => {
    const hasOnlyBinaryChars = /^[01\s]+$/.test(text);
    if (hasOnlyBinaryChars) return 'binary';

    const hasOnlyOctalChars = /^[0-7\s]+$/.test(text);
    if (hasOnlyOctalChars) return 'octal';

    const hasOnlyDecimalChars = /^[0-9\s]+$/.test(text);
    const hasHexLetters = /[a-fA-F]/.test(text);

    if (hasOnlyDecimalChars && !hasHexLetters) {
      return 'decimal';
    }

    const hasOnlyHexChars = /^[0-9a-fA-F\s]+$/.test(text);
    if (hasOnlyHexChars) return 'hexadecimal';

    // Default to decimal if detection fails
    return 'decimal';
  };

  const getRadix = (type) => {
    switch (type) {
      case 'binary':
        return 2;
      case 'octal':
        return 8;
      case 'decimal':
        return 10;
      case 'hexadecimal':
        return 16;
      default:
        return 10;
    }
  };

  return (
    <div className="number-to-ascii">
      <h1>Number to ASCII Converter</h1>
      <div className="form-group">
        <label>Input Numbers:</label>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter numbers separated by spaces"
        ></textarea>
      </div>
      <div className="form-group">
        <label>Input Type:</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              value="auto"
              checked={inputType === 'auto'}
              onChange={(e) => setInputType(e.target.value)}
            />
            Auto
          </label>
          <label>
            <input
              type="radio"
              value="binary"
              checked={inputType === 'binary'}
              onChange={(e) => setInputType(e.target.value)}
            />
            Binary
          </label>
          <label>
            <input
              type="radio"
              value="octal"
              checked={inputType === 'octal'}
              onChange={(e) => setInputType(e.target.value)}
            />
            Octal
          </label>
          <label>
            <input
              type="radio"
              value="decimal"
              checked={inputType === 'decimal'}
              onChange={(e) => setInputType(e.target.value)}
            />
            Decimal
          </label>
          <label>
            <input
              type="radio"
              value="hexadecimal"
              checked={inputType === 'hexadecimal'}
              onChange={(e) => setInputType(e.target.value)}
            />
            Hexadecimal
          </label>
        </div>
      </div>
      {inputType === 'auto' && detectedType && (
        <div className="detected-type">
          <p>
            Detected input type:{' '}
            <strong>{detectedType.charAt(0).toUpperCase() + detectedType.slice(1)}</strong>
          </p>
        </div>
      )}
      <div className="form-group">
        <label>ASCII Text:</label>
        <textarea value={outputText} readOnly></textarea>
      </div>
    </div>
  );
};

export default NumberToAscii;
