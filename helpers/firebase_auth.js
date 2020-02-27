import firebase from 'firebase';

export default {
    signUp: (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password),
    signIn: (email, password) => firebase.auth().signInWithEmailAndPassword(email, password),
    signOut: () => firebase.auth().signOut(),
    getCurrentUser: () => firebase.auth().currentUser
}