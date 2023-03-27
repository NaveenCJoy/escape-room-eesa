import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

var firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCcGcU2509VWBqEU5u8MCiLfrNy_rfxrCw",
  authDomain: "escape-room-eesa.firebaseapp.com",
  databaseURL: "https://escape-room-eesa-default-rtdb.firebaseio.com",
  projectId: "escape-room-eesa",
  storageBucket: "escape-room-eesa.appspot.com",
  messagingSenderId: "520010194933",
  appId: "1:520010194933:web:e15163396ce2636166cabc",
});

var db = firebaseApp.firestore();

export { db };
