import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDgwNqlPWsmGG8RoSA4_g191hUxHtEFxTs",
    authDomain: "music-store-3ecd0.firebaseapp.com",
    projectId: "music-store-3ecd0",
    storageBucket: "music-store-3ecd0.appspot.com",
    messagingSenderId: "59904388197",
    appId: "1:59904388197:web:29be355d3fa8bfa6ccaa8c"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();

  export {auth};