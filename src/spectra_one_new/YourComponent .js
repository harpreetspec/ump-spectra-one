import React, { useState,useEffect } from 'react';
import CryptoJS from 'crypto-js';

const encryptionKeyBase64 = 'ZUZ2QXc2R2tDZVFfRVFVQUxTXw==';
const encryptionKey = CryptoJS.enc.Base64.parse(encryptionKeyBase64);

function encrypt(pureString) {
  const encrypted = CryptoJS.AES.encrypt(pureString, encryptionKey, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  }).toString();

  // Replace characters for safer transmission (optional step)
  return encrypted.replace(/[+/=]/g, (match) => {
    return {
      '+': '_PLUS_',
      '/': '_SLASH_',
      '=': '_EQUALS_'
    }[match];
  });
}

function decrypt(encryptedString) {
  // Reverse the replacement process
  const dirtyString = encryptedString.replace(/_PLUS_|_SLASH_|_EQUALS_/g, (match) => {
    return {
      '_PLUS_': '+',
      '_SLASH_': '/',
      '_EQUALS_': '='
    }[match];
  });

  const decrypted = CryptoJS.AES.decrypt(dirtyString, encryptionKey, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
}

const EncryptDecryptComponent = () => {
  const [input, setInput] = useState('');
  const [encrypted, setEncrypted] = useState('');
  const [decrypted, setDecrypted] = useState('');

  const handleEncrypt = () => {
    try {
      const encryptedStr = encrypt(input);
      setEncrypted(encryptedStr);
    } catch (error) {
      console.error('Encryption Error:', error);
    }
  };

  const handleDecrypt = () => {
    try {
      const decryptedStr = decrypt(encrypted);
      setDecrypted(decryptedStr);
    } catch (error) {
      console.error('Decryption Error:', error);
    }
  };
  const secretKey = 'Spectra';

  useEffect(() => {
    let otpGenerated = "ZUZ2QXc2R2tDZVFfRVFVQUxTXw=="
    const bytes = CryptoJS.AES.decrypt(otpGenerated, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    console.log("Decrypted Data:", decryptedData);
    // setOtp(decryptedData);
    // console.log("otp", otp);
  });

  return (
    <div>
      <h2>AES Encryption and Decryption</h2>
      <div>
        <label>Enter text to encrypt:</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleEncrypt}>Encrypt</button>
      </div>
      <div>
        <label>Encrypted Text:</label>
        <div>{encrypted}</div>
      </div>
      <div>
        <button onClick={handleDecrypt}>Decrypt</button>
      </div>
      <div>
        <label>Decrypted Text:</label>
        <div>{decrypted}</div>
      </div>
    </div>
  );
};

export default EncryptDecryptComponent;
