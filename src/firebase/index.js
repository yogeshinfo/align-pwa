import firebase from 'firebase'

export const config = {
    apiKey: "AIzaSyAnQN8EUBG0d2osXqkkGGEmYYv2yP6vhIQ",
    authDomain: "align-4f72f.firebaseapp.com",
    databaseURL: "https://align-4f72f.firebaseio.com",
    projectId: "align-4f72f",
    storageBucket: "align-4f72f.appspot.com",
    messagingSenderId: "749145960673"
}

firebase.initializeApp(config)
const messaging = firebase.messaging();
messaging.requestPermission()
.then( function () {{
    console.log('Permission')
})
.catch ( function (err) {
    console.log(err)
})
/*var firebaseRef = firebase.database().ref()
export default firebase
export var alignRef = firebaseRef.child('align')*/