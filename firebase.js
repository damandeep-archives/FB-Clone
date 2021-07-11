/* eslint-disable import/newline-after-import */
import firebase from 'firebase';
import "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyB5O-yZ6XJUSbdEdr9REtDEJaN_BX6IZGM",
    authDomain: "fbclone-334e5.firebaseapp.com",
    projectId: "fbclone-334e5",
    storageBucket: "fbclone-334e5.appspot.com",
    messagingSenderId: "890533351316",
    appId: "1:890533351316:web:1dc35c3401312a4af00981"
  };


  const app=!firebase.apps.length? firebase.initializeApp(firebaseConfig):firebase.app();

  const db=app.firestore();
  const storage=firebase.storage();


  export{db,storage};