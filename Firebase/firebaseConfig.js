import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD4d7d8aPw8TreVdUfdM66R-JvibEAt0ks",
    authDomain: "gallamart2.firebaseapp.com",
    projectId: "gallamart2",
    storageBucket: "gallamart2.appspot.com",
    messagingSenderId: "849028329591",
    appId: "1:849028329591:web:1dc51473fd85b91ee21672",
    measurementId: "G-BCW5DS0MXX"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}


// const storage  = firebase.storage(app);
// const db = firebase.firestore();
// const auth = firebase.auth();

export { firebase };