document.addEventListener("DOMContentLoaded", function () {
    cargarDatosPerfil();
    cargarExperiencia();
    cargarHabilidades();
});

// Función para abrir y cerrar el modal de perfil
function abrirModalEditar() {
    document.getElementById("modal-editar").style.display = "flex";
}

function cerrarModal() {
    document.getElementById("modal-editar").style.display = "none";
}

// Guardar cambios en el perfil
function guardarCambios() {
    let nuevoNombre = document.getElementById("editar-nombre").value;
    let nuevaDescripcion = document.getElementById("editar-descripcion").value;
    let nuevaUbicacion = document.getElementById("editar-ubicacion").value;

    if (nuevoNombre) {
        document.getElementById("nombre-usuario").textContent = nuevoNombre;
        localStorage.setItem("nombreUsuario", nuevoNombre);
    }
    if (nuevaDescripcion) {
        document.getElementById("descripcion-usuario").textContent = nuevaDescripcion;
        localStorage.setItem("descripcionUsuario", nuevaDescripcion);
    }
    if (nuevaUbicacion) {
        document.getElementById("ubicacion-usuario").textContent = nuevaUbicacion;
        localStorage.setItem("ubicacionUsuario", nuevaUbicacion);
    }

    cerrarModal();
}

// Funciones para Experiencia Laboral
function abrirModalExperiencia() {
    document.getElementById("modal-experiencia").style.display = "flex";
}

function cerrarModalExperiencia() {
    document.getElementById("modal-experiencia").style.display = "none";
}

function agregarExperiencia() {
    let empresa = document.getElementById("exp-empresa").value;
    let puesto = document.getElementById("exp-puesto").value;
    let año = document.getElementById("exp-año").value;

    if (empresa && puesto && año) {
        let experiencia = `${empresa} - <em>${puesto}</em> (${año})`;
        let lista = document.getElementById("lista-experiencia");
        let item = document.createElement("li");
        item.innerHTML = experiencia;
        lista.appendChild(item);

        localStorage.setItem("experiencia", lista.innerHTML);
    }

    cerrarModalExperiencia();
}

// Funciones para Habilidades
function abrirModalHabilidad() {
    document.getElementById("modal-habilidad").style.display = "flex";
}

function cerrarModalHabilidad() {
    document.getElementById("modal-habilidad").style.display = "none";
}

function agregarHabilidad() {
    let habilidad = document.getElementById("nueva-habilidad").value;
    if (habilidad) {
        let lista = document.getElementById("lista-habilidades");
        let item = document.createElement("li");
        item.textContent = habilidad;
        lista.appendChild(item);

        localStorage.setItem("habilidades", lista.innerHTML);
    }

    cerrarModalHabilidad();
}
