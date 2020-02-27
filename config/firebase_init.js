import firebase from 'firebase';

export default () => {
    const firebaseConfig = {
        apiKey: "AIzaSyDQDf1mZtqI0vSYO4cxZWNUlNLy8OiZ1e8",
        authDomain: "myjarvis-d5a0c.firebaseapp.com",
        databaseURL: "https://myjarvis-d5a0c.firebaseio.com",
        projectId: "myjarvis-d5a0c",
        storageBucket: "myjarvis-d5a0c.appspot.com",
        messagingSenderId: "948845415055",
        appId: "1:948845415055:web:a1a8159aa594a62d73befa"
    };
    firebase.initializeApp(firebaseConfig);
};