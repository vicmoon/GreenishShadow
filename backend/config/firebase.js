// firebase.js
const { initializeApp } = require('firebase/app');
const { getStorage } = require('firebase/storage');

// Your Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDJ-EslLfmE8aIgHoN6LFNGfjX-jvwg8Vk',
  authDomain: 'greenishshadow-4e98a.firebaseapp.com',
  projectId: 'greenishshadow-4e98a',
  storageBucket: 'greenishshadow-4e98a.appspot.com',
  messagingSenderId: '1047270130975',
  appId: '1:1047270130975:web:da0e3970594be4128d1c2a',
  measurementId: 'G-46KS3MEB1R',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

module.exports = { app, storage }; // Export your initialized Firebase services
