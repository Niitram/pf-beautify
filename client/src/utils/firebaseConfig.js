import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAACot6qy29p4K1ra6oQ_1CGVjDTbe0dsw",
  authDomain: "beautify-386112.firebaseapp.com",
  projectId: "beautify-386112",
  storageBucket: "beautify-386112.appspot.com",
  messagingSenderId: "147710965841",
  appId: "1:147710965841:web:a513945b789016403ee070",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
