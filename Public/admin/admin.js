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

    async function fetchUsers() {
        const usersData = await fetchData('users');
        if (usersData) renderUsersTable(usersData);
    }

    async function fetchEmpleos() {
    const empleosData = await fetchData('empleos'); // Asegúrate de que el endpoint sea '/empleos'
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
            <td>${empleo.id_empleador}</td>
            <td>${empleo.categoria_id || '-'}</td>
            <td>${fechaPublicacion}</td>
            <td>
                <button class="editEmpleoBtn" data-id="${empleo.id}">Editar</button>
                <button class="deleteEmpleoBtn" data-id="${empleo.id}">Eliminar</button>
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

    // Configurar event delegation para cada tabla
    setupTableEventDelegation(tableBodies.users, 'editUserBtn', 'deleteUserBtn', editUser, deleteUser);
    setupTableEventDelegation(tableBodies.offers, 'editOfferBtn', 'deleteOfferBtn', editOffer, deleteOffer);

    // Funciones para CRUD de usuarios
    async function editUser(id) {
        try {
            const user = await fetchData(`users/${id}`);
            if (user) {
                document.getElementById('userId').value = user.id;
                document.getElementById('nombre').value = user.nombre;
                document.getElementById('email').value = user.correo || user.email;
                document.getElementById('esEmpresa').value = user.es_empresa ? '1' : '0';
                userFormSection.style.display = 'block';
                showSection(sections.users);
            }
        } catch (error) {
            console.error(error);
            alert('No se pudo cargar el usuario para editar');
        }
    }

    async function deleteUser(id) {
        if (!confirm('¿Estás seguro de eliminar este usuario?')) return;
        try {
            const response = await fetch(`${API_BASE_URL}/users/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (!response.ok) throw new Error('Error al eliminar usuario');
            fetchUsers();
        } catch (error) {
            console.error(error);
            alert('No se pudo eliminar el usuario');
        }
    }

    // Funciones para CRUD de ofertas
    async function editOffer(id) {
        try {
            const offer = await fetchData(`offers/${id}`);
            if (offer) {
                // Llenar formulario de edición de oferta
                // (Implementar según tus campos de formulario)
                console.log('Editar oferta:', offer);
                alert('Función de edición de oferta a implementar');
            }
        } catch (error) {
            console.error(error);
            alert('No se pudo cargar la oferta para editar');
        }
    }

    async function deleteOffer(id) {
        if (!confirm('¿Estás seguro de eliminar esta oferta?')) return;
        try {
            const response = await fetch(`${API_BASE_URL}/offers/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (!response.ok) throw new Error('Error al eliminar oferta');
            fetchOffers();
        } catch (error) {
            console.error(error);
            alert('No se pudo eliminar la oferta');
        }
    }

    // Manejo de formulario de usuario
    userForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = parseInt(document.getElementById('userId').value);
        const userData = {
            nombre: document.getElementById('nombre').value,
            email: document.getElementById('email').value,
            es_empresa: document.getElementById('esEmpresa').value === '1'
        };

        try {
            const response = await fetch(`${API_BASE_URL}/users${id ? `/${id}` : ''}`, {
                method: id ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(userData)
            });

            if (!response.ok) throw new Error('Error al guardar usuario');
            
            fetchUsers();
            userFormSection.style.display = 'none';
            userForm.reset();
        } catch (error) {
            console.error(error);
            alert('No se pudo guardar el usuario');
        }
    });

    // Botón cancelar formulario de usuario
    document.getElementById('btnCancel').addEventListener('click', () => {
        userFormSection.style.display = 'none';
        userForm.reset();
    });

    // Mostrar dashboard por defecto
    showSection(sections.dashboard);
});