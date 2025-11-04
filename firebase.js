// Importar las librerías necesarias desde Firebase CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCE_nv7WdynM34A_BrsINMvThp1xgMRD4Q",
  authDomain: "dragonesmaps.firebaseapp.com",
  projectId: "dragonesmaps",
  storageBucket: "dragonesmaps.firebasestorage.app",
  messagingSenderId: "773925628735",
  appId: "1:773925628735:web:460642937888bf4b6b418a",
  measurementId: "G-6MRD5VBKNW"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Exportar las instancias para usarlas en otros scripts
export { app, analytics, auth, db };
