import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDm9XTLYmPHgkXQwzbpjIkr7ay07RhM1AM",
    authDomain: "vuemusicproject1.firebaseapp.com",
    projectId: "vuemusicproject1",
    storageBucket: "vuemusicproject1.appspot.com",
    messagingSenderId: "724021713386",
    appId: "1:724021713386:web:c8e1442118bf7cc1ad3a93"
  };


// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage=firebase.storage()
// timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectFirestore, projectAuth, timestamp,projectStorage }