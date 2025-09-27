import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAdwEeVAvHU6cUxHCaIfcGY1VHXjUW6fow",
  authDomain: "carrentalapp-b6862.firebaseapp.com",
  projectId: "carrentalapp-b6862",
  storageBucket: "carrentalapp-b6862.firebasestorage.app",
  messagingSenderId: "722148486629",
  appId: "1:722148486629:web:beaf5205c436d40e88530c",
  measurementId: "G-NKT1P56X3K"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export default app;