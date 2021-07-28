import firebase from "firebase/app"
import "firebase/auth"
import "firebase/storage"
import "firebase/firestore"

firebase.initializeApp(
    {
        apiKey: "AIzaSyBynd6jEzheot_BCR7_HkogaemMEtPFIpo",
        authDomain: "reels-be210.firebaseapp.com",
        projectId: "reels-be210",
        storageBucket: "reels-be210.appspot.com",
        messagingSenderId: "1042443963824",
        appId: "1:1042443963824:web:802c7f75a7eda5ca601a75"
    }
)
export const auth=firebase.auth();
const firestore=firebase.firestore();
export const database={
    users:firestore.collection('users'),
    posts:firestore.collection('posts'),
    comments:firestore.collection('comments'),
    getCurrentTimeStamp: firebase.firestore.FieldValue.serverTimestamp
}
export const storage = firebase.storage();