// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA0_Onnztp6wPl3lI0jAFVS4HjQzq4pASc',
  authDomain: 'email-password-auth-projects.firebaseapp.com',
  projectId: 'email-password-auth-projects',
  storageBucket: 'email-password-auth-projects.appspot.com',
  messagingSenderId: '700553613037',
  appId: '1:700553613037:web:bb8b33c35d18525f86c6e4',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
