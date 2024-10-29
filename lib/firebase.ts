import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCopx5Hk7QK3JkyrVU9IWYJuERPn7vH43E",
  authDomain: "kingdomrunnersdv1.firebaseapp.com",
  projectId: "kingdomrunnersdv1",
  storageBucket: "kingdomrunnersdv1.appspot.com",
  messagingSenderId: "626559745548",
  appId: "1:626559745548:web:3e2f5d7498f7e3beb1f829",
  measurementId: "G-0G8N8DZWHW"
};

// Initialize Firebase
let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firestore
const db = getFirestore(firebase_app);

// Initialize Analytics conditionally (only in browser)
const analytics = typeof window !== 'undefined' ? isSupported().then(yes => yes ? getAnalytics(firebase_app) : null) : null;

export { firebase_app, db, analytics };