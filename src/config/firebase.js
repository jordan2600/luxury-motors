import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Reemplaza esto con la configuración de tu proyecto de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAjeBvI0hHkoX0RO5eLe7EdoLQuX8w2Ylo",
  authDomain: "proyecto-luxury-58505.firebaseapp.com",
  projectId: "proyecto-luxury-58505",
  storageBucket: "proyecto-luxury-58505.firebasestorage.app",
  messagingSenderId: "209227299725",
  appId: "1:209227299725:web:afa40f6dfcb8aea2779bc4",
  measurementId: "G-17FW385KH2"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
const db = getFirestore(app);

export { db };
