document.addEventListener('DOMContentLoaded', () => {
    // Elementos de navegación
    const navLinks = {
        dashboard: document.getElementById('dashboardLink'),
        users: document.getElementById('usersLink'),
        offers: document.getElementById('offersLink')
    };

    // Secciones
    const sections = {
        dashboard: document.getElementById('dashboardSection'),
        users: document.getElementById('usersSection'),
        offers: document.getElementById('offersSection')
    };

    // Tablas
    const tableBodies = {
        users: document.querySelector('#usersTable tbody'),
        offers: document.querySelector('#offersTable tbody')
    };

    // Formularios
    const userForm = document.getElementById('userForm');
    const userFormSection = document.getElementById('userFormSection');

    // Base URL para la API
    const API_BASE_URL = 'https://red-de-empleo-production.up.railway.app/api/admin';

    // Función para mostrar secciones
    function showSection(sectionToShow) {
        // Ocultar todas las secciones
        Object.values(sections).forEach(section => {
            section.style.display = 'none';
        });

        // Remover clase active de todos los links
        Object.values(navLinks).forEach(link => {
            link.classList.remove('active');
        });

        // Mostrar sección seleccionada
        sectionToShow.style.display = 'block';

        const fetchOffers = fetchEmpleos;

        // Activar link correspondiente y cargar datos si es necesario
        for (const [key, section] of Object.entries(sections)) {
            if (section === sectionToShow) {
                navLinks[key].classList.add('active');
                
                // Cargar datos según la sección
                switch(key) {
                    case 'users':
                        fetchUsers();
                        break;
                    case 'offers':
                        fetchOffers();
                        break;
                }
                break;
            }
        }
    }

    // Funciones para obtener datos desde el backend
    async function fetchData(endpoint) {
        try {
            const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
                method: 'GET',
                credentials: 'include'
            });

            if (!response.ok) throw new Error(`Error al obtener ${endpoint}`);
            return await response.json();
        } catch (error) {
            console.error(error);
            alert(`No se pudieron cargar los ${endpoint}`);
            return null;
        }
    }

    async function fetchUsers(searchQuery = '') {
        const endpoint = searchQuery ? `users?search=${encodeURIComponent(searchQuery)}` : 'users';
        const usersData = await fetchData(endpoint);
        if (usersData) renderUsersTable(usersData);
    }

    // Add event listener for user search input
    const userSearchInput = document.getElementById('userSearchInput');
    userSearchInput.addEventListener('input', (e) => {
        const searchValue = e.target.value.trim();
        fetchUsers(searchValue);
    });

    async function fetchEmpleos() {
    const empleosData = await fetchData('offers'); // Asegúrate de que el endpoint sea '/empleos'
    if (empleosData) renderEmpleosTable(empleosData);
}

    // Funciones para renderizar tablas
    function renderUsersTable(usersData) {
        tableBodies.users.innerHTML = '';
        usersData.forEach(user => {
            let tipoCuenta = 'Usuario';
            if (user.id_rol === 1) tipoCuenta = 'Empresa';
            else if (user.id_rol === 3) tipoCuenta = 'Admin';

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${user.id}</td>
                <td>${user.nombre}</td>
                <td>${user.correo || user.email || ''}</td>
                <td>${tipoCuenta}</td>
                <td>${user.id_rol === 1 ? 'Sí' : 'No'}</td>
                <td>${user.id_rol}</td>
                <td>
                    <button class="editUserBtn" data-id="${user.id}">Editar</button>
                    <button class="deleteUserBtn" data-id="${user.id}">Eliminar</button>
                </td>
            `;
            tableBodies.users.appendChild(tr);
        });
    }

    function renderEmpleosTable(empleosData) {
    tableBodies.offers.innerHTML = '';
    empleosData.forEach(empleo => {
        const fechaPublicacion = new Date(empleo.fecha_publicacion).toLocaleDateString('es-ES');

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${empleo.id}</td>
            <td>${empleo.titulo}</td>
            <td>${empleo.descripcion || ''}</td>
            <td>${empleo.ubicacion || '-'}</td>
            <td>${empleo.requisitos || '-'}</td>
            <td>${fechaPublicacion}</td>
            <td>
                <button class="editOfferBtn" data-id="${empleo.id}">Editar</button>
                <button class="deleteOfferBtn" data-id="${empleo.id}">Eliminar</button>

            </td>
        `;
        tableBodies.offers.appendChild(tr);
             });
    }

    // Event listeners para navegación
    Object.entries(navLinks).forEach(([key, link]) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showSection(sections[key]);
        });
    });

    // Event delegation para botones en tablas
    function setupTableEventDelegation(tableBody, editClass, deleteClass, editHandler, deleteHandler) {
        tableBody.addEventListener('click', (e) => {
            if (editClass && e.target.classList.contains(editClass)) {
                const id = e.target.getAttribute('data-id');
                editHandler(id);
            } else if (deleteClass && e.target.classList.contains(deleteClass)) {
                const id = e.target.getAttribute('data-id');
                deleteHandler(id);
            }
        });
    }

    // Delegación de eventos para tablas
setupTableEventDelegation(tableBodies.users, 'editUserBtn', 'deleteUserBtn', editUser, deleteUser);
setupTableEventDelegation(tableBodies.offers, 'editOfferBtn', 'deleteOfferBtn', editOffer, deleteOffer);

// ==================== CRUD USUARIOS ====================

// Editar usuario
async function editUser(id) {
    try {
        const user = await fetchData(`users/${id}`);
        if (user) {
            document.getElementById('userId').value = user.id;
            document.getElementById('nombre').value = user.nombre;
            document.getElementById('email').value = user.correo;
          // Convierte id_rol del backend a valor del select
            let selectValue = '0';
            if (user.id_rol === 2) selectValue = '1'; // Empresa
            else if (user.id_rol === 3) selectValue = '2'; // Admin
                // Usuario se mantiene como '0'
            document.getElementById('esEmpresa').value = selectValue;

            userFormSection.style.display = 'block';
            showSection(sections.users);
        }
    } catch (error) {
        console.error(error);
        alert('No se pudo cargar el usuario para editar');
    }
}

// Eliminar usuario
async function deleteUser(id) {
    if (!confirm('¿Estás seguro de eliminar este usuario?')) return;
    try {
        const response = await fetch(`${API_BASE_URL}/users/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        });
        if (!response.ok) throw new Error('Error al eliminar usuario');
        alert('Usuario eliminado correctamente');
        fetchUsers();
    } catch (error) {
        console.error(error);
        alert('No se pudo eliminar el usuario');
    }
}

// Manejo del formulario de usuario (crear / editar)
    userForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = parseInt(document.getElementById('userId').value);
    const rolSelect = document.getElementById('esEmpresa').value;

    let id_rol = 2; // Usuario por defecto
    if (rolSelect === '1') id_rol = 1; // Empresa
    else if (rolSelect === '2') id_rol = 3; // Admin

    const userData = {
        nombre: document.getElementById('nombre').value,
        correo: document.getElementById('email').value,
        id_rol: id_rol
    };

    try {
        const response = await fetch(`${API_BASE_URL}/users${id ? `/${id}` : ''}`, {
            method: id ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(userData)
        });

        if (!response.ok) throw new Error('Error al guardar el usuario');

        alert(id ? 'Usuario actualizado correctamente' : 'Usuario creado exitosamente');
        fetchUsers();
        userFormSection.style.display = 'none';
        userForm.reset();
    } catch (error) {
        console.error('Error al guardar el usuario:', error);
        alert('No se pudo guardar el usuario');
    }
});


// Botón cancelar formulario de usuario
document.getElementById('btnCancel').addEventListener('click', () => {
    userFormSection.style.display = 'none';
    userForm.reset();
});

// ==================== CRUD OFERTAS ====================
const offerForm = document.getElementById('offerForm');
const offerFormSection = document.getElementById('offerFormSection');
const formTitle = document.getElementById('formTitle');
const btnCancelOffer = document.getElementById('btnCancelOffer');

// Editar oferta (mostrar formulario con datos)
async function editOffer(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/offers/${id}`);
        if (!response.ok) throw new Error('Error al obtener la oferta');

        const oferta = await response.json();

        document.getElementById('offerId').value = oferta.id;
        document.getElementById('titulo').value = oferta.titulo;
        document.getElementById('ubicacion').value = oferta.ubicacion || '';
        document.getElementById('requisitos').value = oferta.requisitos || '';
        document.getElementById('descripcion').value = oferta.descripcion;
        document.getElementById('fechaPublicacion').value = new Date(oferta.fecha_publicacion).toISOString().split('T')[0];

        formTitle.textContent = 'Editar Oferta';
        offerFormSection.style.display = 'block';
    } catch (error) {
        console.error(error);
        alert('No se pudo cargar la oferta para editar');
    }
}

// Eliminar oferta
async function deleteOffer(id) {
    if (!confirm('¿Estás seguro de eliminar esta oferta?')) return;

    try {
        const response = await fetch(`${API_BASE_URL}/offers/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        });

        if (!response.ok) throw new Error('Error al eliminar la oferta');
        alert('Oferta eliminada correctamente');
        fetchEmpleos(); // Recargar tabla
    } catch (error) {
        console.error(error);
        alert('No se pudo eliminar la oferta');
    }
}

// Cancelar edición / creación
btnCancelOffer.addEventListener('click', () => {
    offerFormSection.style.display = 'none';
    offerForm.reset();
});

// Crear o actualizar oferta
offerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('offerId').value;
    const titulo = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value;
    const fechaPublicacion = document.getElementById('fechaPublicacion').value;
    const ubicacion = document.getElementById('ubicacion').value;
    const requisitos = document.getElementById('requisitos').value;

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${API_BASE_URL}/offers/${id}` : `${API_BASE_URL}/offers`;

    try {
        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                titulo,
                descripcion,
                fecha_publicacion: fechaPublicacion,
                ubicacion,
                requisitos
            })
        });
        

        if (!response.ok) throw new Error('Error al guardar la oferta');

        alert(id ? 'Oferta actualizada correctamente' : 'Oferta creada exitosamente');
        offerFormSection.style.display = 'none';
        offerForm.reset();
        fetchEmpleos(); // Refrescar la tabla sin recargar
    } catch (error) {
        console.error(error);
        alert('Error al guardar la oferta');
    }
});

    // Mostrar dashboard por defecto
    showSection(sections.dashboard);
});