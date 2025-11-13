const auth = window.firebaseAuth;
const db = window.firebaseDB;

// --- REGISTRO DE USUARIO ---
async function registerUser() {
    const username = document.getElementById("reg-username").value;
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;
    const role = document.getElementById("reg-role").value;

    try {
        // Crear usuario en Firebase Auth
        const userCred = await auth.createUserWithEmailAndPassword(email, password);

        // Guardar información en Firestore
        await db.collection("users").doc(userCred.user.uid).set({
            username: username,
            email: email,
            role: role,
            createdAt: new Date()
        });

        alert("Cuenta creada con éxito ✔");
        
        // Redirigir a subastas
        window.location.href = "subastas.html";

    } catch (error) {
        alert("Error creando cuenta: " + error.message);
    }
}


// --- INICIO DE SESIÓN ---
async function loginUser() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
        await auth.signInWithEmailAndPassword(email, password);

        alert("Inicio de sesión correcto ✔");

        // Redirigir a subastas
        window.location.href = "subastas.html";

    } catch (error) {
        alert("Error al iniciar sesión: " + error.message);
    }
}
