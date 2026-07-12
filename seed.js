import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAjeBvI0hHkoX0RO5eLe7EdoLQuX8w2Ylo",
  authDomain: "proyecto-luxury-58505.firebaseapp.com",
  projectId: "proyecto-luxury-58505",
  storageBucket: "proyecto-luxury-58505.firebasestorage.app",
  messagingSenderId: "209227299725",
  appId: "1:209227299725:web:afa40f6dfcb8aea2779bc4",
  measurementId: "G-17FW385KH2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seedData() {
  console.log("Iniciando carga de datos a Firestore...");
  try {
    const docRef = await addDoc(collection(db, "vehiculos"), {
      marca: "Aston Martin",
      modelo: "DB11",
      año: "2024",
      categoria: "Luxury",
      motor: "V12 5.2L Twin-Turbo",
      potencia: "630 HP",
      aceleracion_0_100: "3.7s",
      velocidad_maxima: "322 km/h",
      precio: 205600,
      imagenUrl: "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?q=80&w=2069&auto=format&fit=crop",
      descripcion: "Elegancia británica y rendimiento excepcional se fusionan en el Aston Martin DB11. Equipado con un motor V12 de 5.2 litros con doble turbocompresor, este vehículo redefine los estándares de los grandes turismos con una combinación inigualable de diseño seductor y potencia estimulante."
    });
    console.log("¡Éxito! Documento escrito con ID: ", docRef.id);
  } catch (e) {
    console.error("Error añadiendo documento: ", e);
  }
  process.exit();
}

seedData();
