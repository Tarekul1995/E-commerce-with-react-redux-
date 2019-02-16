import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var config = {
    apiKey: "AIzaSyBiavGLm5-zZ_RNJh2GJTjC2vsCVMPfrSE",
    authDomain: "e-commerecreact.firebaseapp.com",
    databaseURL: "https://e-commerecreact.firebaseio.com",
    projectId: "e-commerecreact",
    storageBucket: "e-commerecreact.appspot.com",
    messagingSenderId: "338708673427"
};
firebase.initializeApp(config);


firebase.firestore().settings({timestampsInSnapshots:true})



export default firebase;