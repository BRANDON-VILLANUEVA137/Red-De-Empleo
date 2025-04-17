// Selección de elementos
const fondo = document.querySelector(".fondo");
const loginLink = document.querySelector(".login_link");
const registrarLink = document.querySelector(".register_link");

// Mostrar pantalla de login
loginLink.addEventListener("click", () => {
    fondo.classList.remove("active"); // Volver a la pantalla de login
});

// Mostrar pantalla de registro
registrarLink.addEventListener("click", () => {
    fondo.classList.add("active"); // Ir a la pantalla de registro
});

function handleCredentialResponse(response) {
    console.log("ID Token de Google:", response.credential);

    // Enviar el token al backend para validación
    fetch('/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: response.credential })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            alert("Inicio de sesión exitoso");
            window.location.href = "/dashboard"; // Redirige a otra página
        } else {
            alert("Error en la autenticación");
        }
    })
    .catch(error => console.error("Error:", error));
}
