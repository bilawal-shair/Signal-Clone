import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth'




const firebaseConfig = {
    apiKey: "AIzaSyCSUGyPXp8tPB5tVvxjnbFWNNkq9jlEuu8",
    authDomain: "signalclone-504e3.firebaseapp.com",
    projectId: "signalclone-504e3",
    storageBucket: "signalclone-504e3.appspot.com",
    messagingSenderId: "221950976256",
    appId: "1:221950976256:web:afafcb4d682f088182d3e5"
  };

  let app;

  if(firebase.apps.length === 0) {

    app = firebase.initializeApp(firebaseConfig);

  }else{

    app = firebase.app();

  }

  const db = app.firestore();
  const auth = firebase.auth();

  export {db, auth};