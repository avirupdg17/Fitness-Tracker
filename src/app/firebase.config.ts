// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: 'AIzaSyDmK77--DJQLd85SAac8yFZOMjjMr8HSAE',
  authDomain: 'fitness-tracker-de610.firebaseapp.com',
  projectId: 'fitness-tracker-de610',
  storageBucket: 'fitness-tracker-de610.appspot.com',
  messagingSenderId: '292647991298',
  appId: '1:292647991298:web:546988ff08e80ea1fdcf1b',
  measurementId: 'G-1LS25XW546',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
