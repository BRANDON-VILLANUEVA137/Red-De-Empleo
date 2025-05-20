document.addEventListener("DOMContentLoaded", function () {
    cargarVacantes();
});

// Abrir y cerrar modal
function abrirModalVacante() {
    document.getElementById("modal-vacante").style.display = "flex";
}

function cerrarModalVacante() {
    document.getElementById("modal-vacante").style.display = "none";
}

// Publicar vacante
function publicarVacante() {
    let puesto = document.getElementById("vacante-puesto").value.trim();
    let tipo = document.getElementById("vacante-tipo").value;
    let salario = document.getElementById("vacante-salario").value.trim();
    let descripcion = document.getElementById("vacante-descripcion").value.trim();

    if (puesto === "" || descripcion === "") {
        alert("Por favor, complete los campos obligatorios.");
        return;
    }

    let nuevaVacante = {
        puesto: puesto,
        tipo: tipo,
        salario: salario ? salario : "No especificado",
        descripcion: descripcion
    };

    let vacantes = JSON.parse(localStorage.getItem("vacantes")) || [];
    vacantes.push(nuevaVacante);
    localStorage.setItem("vacantes", JSON.stringify(vacantes));

    mostrarVacante(nuevaVacante);
    cerrarModalVacante();
}

// Cargar vacantes desde localStorage
function cargarVacantes() {
    let vacantes = JSON.parse(localStorage.getItem("vacantes")) || [];
    vacantes.forEach(mostrarVacante);
}

// Mostrar vacante en la lista
function mostrarVacante(vacante) {
    let lista = document.getElementById("lista-vacantes");
    let item = document.createElement("li");
    item.innerHTML = `<strong>Puesto:</strong> ${vacante.puesto} - <em>${vacante.tipo}</em> 
                      <br><strong>Salario:</strong> ${vacante.salario} 
                      <br><strong>Descripción:</strong> ${vacante.descripcion}`;
    lista.appendChild(item);
}
