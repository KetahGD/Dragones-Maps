import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

/* ==========================================================
   REGISTRO DE USUARIO
========================================================== */
export async function registrarUsuario(nombre, correo, password, confirmar) {
  if (!nombre || !correo || !password) {
    alert("Completa todos los campos");
    return;
  }
  if (password !== confirmar) {
    alert("Las contraseñas no coinciden");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, correo, password);
    const user = userCredential.user;

    await setDoc(doc(db, "usuarios", user.uid), {
      nombre: nombre,
      correo: correo,
      creado: new Date()
    });

    alert("Cuenta creada correctamente. Bienvenido, " + nombre);
    window.location.href = "IniciarSesion.html";
  } catch (error) {
    alert("Error al crear cuenta: " + error.message);
  }
}

/* ==========================================================
   INICIO DE SESIÓN
========================================================== */
export async function iniciarSesion(correo, password) {
  if (!correo || !password) {
    alert("Completa todos los campos");
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, correo, password);
    const user = userCredential.user;

    alert("Bienvenido: " + user.email);
    window.location.href = "index.html";
  } catch (error) {
    alert("Error al iniciar sesión: " + error.message);
  }
}

/* ==========================================================
   CERRAR SESIÓN
========================================================== */
export async function cerrarSesion() {
  try {
    await signOut(auth);
    alert("Has cerrado sesión.");
    window.location.href = "IniciarSesion.html";
  } catch (error) {
    alert("Error al cerrar sesión: " + error.message);
  }
}

/* ==========================================================
   DETECTAR SI HAY USUARIO ACTIVO
========================================================== */
export function detectarUsuarioActivo(callback) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      callback(user);
    } else {
      callback(null);
    }
  });
}
