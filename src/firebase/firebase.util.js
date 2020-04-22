import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


  
  // Your web app's Firebase configuration
  const config = {
    apiKey: "AIzaSyAw0y_y0J1y3BmGMhdXHYT-ekbL6ilig3s",
    authDomain: "crwn-db-166dd.firebaseapp.com",
    databaseURL: "https://crwn-db-166dd.firebaseio.com",
    projectId: "crwn-db-166dd",
    storageBucket: "crwn-db-166dd.appspot.com",
    messagingSenderId: "10563902820",
    appId: "1:10563902820:web:51d8c98f41ee28bfc16e71",
    measurementId: "G-LJ2WBRZ58N"
  };


  export const createUserProfileDocument = async (userAuth, additionalData) => {

    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShop = await userRef.get();
    
    if (!snapShop.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        console.log(`AdditionalData: ${additionalData}`);
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                 ...additionalData
                });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();


  const provider = new firebase.auth.GoogleAuthProvider();

  provider.setCustomParameters({prompt: 'select_account'});

  export const signInWithGoogle = () => auth.signInWithPopup(provider);


  export default firebase;
