// This configuration must be replaced with your actual Firebase project settings.
const firebaseConfig = {
  apiKey: "AIzaSyAiTAklybFZXUYXwK9Y8XmD-Hwn_R_Sqd8",
  authDomain: "prismnest-46.firebaseapp.com",
  projectId: "prismnest-46",
  storageBucket: "prismnest-46.firebasestorage.app",
  messagingSenderId: "337634695856",
  appId: "1:337634695856:web:8b1db89b6c7237e6647975",
  measurementId: "G-G6YHFSBSXZ",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = app.auth();
