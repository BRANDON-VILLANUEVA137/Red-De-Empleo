document.addEventListener('DOMContentLoaded', () => {
    const dashboardLink = document.getElementById('dashboardLink');
    const usersLink = document.getElementById('usersLink');
    const offersLink = document.getElementById('offersLink');

    const dashboardSection = document.getElementById('dashboardSection');
    const usersSection = document.getElementById('usersSection');
    const offersSection = document.getElementById('offersSection');

    function showSection(sectionToShow) {
        dashboardSection.style.display = 'none';
        usersSection.style.display = 'none';
        offersSection.style.display = 'none';

        sectionToShow.style.display = 'block';

        dashboardLink.classList.remove('active');
        usersLink.classList.remove('active');
        offersLink.classList.remove('active');

        if (sectionToShow === dashboardSection) {
            dashboardLink.classList.add('active');
            fetchDashboardCounts();
        } else if (sectionToShow === usersSection) {
            usersLink.classList.add('active');
            fetchUsers();
        } else if (sectionToShow === offersSection) {
            offersLink.classList.add('active');
            fetchOffers();
        }
    }

    // Base URL for backend API

    const API_BASE_URL = 'https://red-de-empleo-production.up.railway.app/api/admin';

    async function fetchUsers() {
        try {
            const response = await fetch(`${API_BASE_URL}/users`, {
                method: 'GET',
                credentials: 'include'
            });

            if (!response.ok) throw new Error('Error al obtener usuarios');
            const usersData = await response.json();
            renderUsersTable(usersData);

            return usersData.length;
        } catch (error) {
            console.error(error);
            alert('No se pudieron cargar los usuarios');
            return 0;
        }
    }

    async function fetchOffers() {
        try {
            const response = await fetch(`${API_BASE_URL}/offers`, {
                method: 'GET',
                credentials: 'include'
            });

            if (!response.ok) throw new Error('Error al obtener ofertas');
            const offersData = await response.json();
            renderOffersTable(offersData);
        } catch (error) {
            console.error(error);
            alert('No se pudieron cargar las ofertas');
        }
    }

    const usersTableBody = document.querySelector('#usersTable tbody');
    function renderUsersTable(usersData) {
        usersTableBody.innerHTML = '';
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
            usersTableBody.appendChild(tr);
        });
    }

    const offersTableBody = document.querySelector('#offersTable tbody');
    async function getEmpresaDetails(empresaId) {
        try {
            const response = await fetch(`${API_BASE_URL}/empleados/${empresaId}`);
            if (!response.ok) throw new Error('Error al obtener empresa');
            const empresa = await response.json();
            return {
                nombre: empresa.nombre || empresa.name || 'Desconocida',
                ubicacion: empresa.ubicacion || 'Desconocida',
                requisitos: empresa.requisitos || 'No especificado'
            };
        } catch (error) {
            console.error(error);
            return {
                nombre: 'Desconocida',
                ubicacion: 'Desconocida',
                requisitos: 'No especificado'
            };
        }
    }

    async function renderOffersTable(offersData) {
        offersTableBody.innerHTML = '';
        for (const offer of offersData) {
            const empresaId = offer.empresa_id || offer.empresaId;
            const fechaPublicacion = offer.fecha_publicacion || offer.fechaPublicacion;
            const empresaDetails = await getEmpresaDetails(empresaId);
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${offer.id}</td>
                <td>${offer.titulo}</td>
                <td>${offer.descripcion}</td>
                <td>${empresaDetails.ubicacion}</td>
                <td>${empresaDetails.requisitos}</td>
                <td>${fechaPublicacion}</td>
                <td>
                    <button class="editOfferBtn" data-id="${offer.id}">Editar</button>
                    <button class="deleteOfferBtn" data-id="${offer.id}">Eliminar</button>
                </td>
            `;
            offersTableBody.appendChild(tr);
        }
    }

    usersTableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('editUserBtn')) {
            const userId = e.target.getAttribute('data-id');
            editUser(userId);
        } else if (e.target.classList.contains('deleteUserBtn')) {
            const userId = e.target.getAttribute('data-id');
            deleteUser(userId);
        }
    });


    // Event delegation para botones editar y eliminar ofertas
    offersTableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('editOfferBtn')) {
            const offerId = e.target.getAttribute('data-id');
            editOffer(offerId);
        } else if (e.target.classList.contains('deleteOfferBtn')) {
            const offerId = e.target.getAttribute('data-id');
            deleteOffer(offerId);
        }
    });

    // Función para editar oferta
    async function editOffer(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/offers/${id}`);
            if (!response.ok) throw new Error('Error al obtener oferta');
            const offer = await response.json();
            document.getElementById('offerId').value = offer.id;
            document.getElementById('titulo').value = offer.titulo;
            document.getElementById('descripcion').value = offer.descripcion;
            // Eliminado el campo empresaId ya que no existe en el formulario
            // document.getElementById('empresaId').value = offer.empresa_id || offer.empresaId;
            document.getElementById('fechaPublicacion').value = offer.fecha_publicacion || offer.fechaPublicacion;
            document.getElementById('offerFormSection').style.display = 'block';
            showSection(offersSection);
        } catch (error) {
            console.error(error);
            alert('No se pudo cargar la oferta para editar');
        }
    }

    // Función para eliminar oferta
    async function deleteOffer(id) {
        if (!confirm('¿Estás seguro de eliminar esta oferta?')) return;
        try {
            const response = await fetch(`${API_BASE_URL}/offers/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Error al eliminar oferta');
            fetchOffers();
        } catch (error) {
            console.error(error);
            alert('No se pudo eliminar la oferta');
        }
    }

    // Manejo del formulario de oferta
    const offerForm = document.getElementById('offerForm');
    offerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = parseInt(document.getElementById('offerId').value);
        const titulo = document.getElementById('titulo').value;
        const descripcion = document.getElementById('descripcion').value;
        const fechaPublicacion = document.getElementById('fechaPublicacion').value;

        const offerData = { titulo, descripcion, fechaPublicacion };

        try {
            let response;
            if (id) {
                response = await fetch(`${API_BASE_URL}/offers/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(offerData)
                });
            } else {
                response = await fetch(`${API_BASE_URL}/offers`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(offerData)
                });
            }
            if (!response.ok) throw new Error('Error al guardar oferta');
            await fetchOffers();
            renderOffersTable(await fetchOffers());
            document.getElementById('offerFormSection').style.display = 'none';
        } catch (error) {
            console.error(error);
            alert('No se pudo guardar la oferta');
        }
    });

    // Cancelar formulario de oferta
    document.getElementById('btnCancel').addEventListener('click', () => {
        document.getElementById('offerFormSection').style.display = 'none';
    });

    // Funciones editUser y deleteUser actualizadas para trabajar con datos reales

    async function editUser(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${id}`);
            if (!response.ok) throw new Error('Error al obtener usuario');
            const user = await response.json();
            document.getElementById('userId').value = user.id;
            document.getElementById('nombre').value = user.nombre;
            document.getElementById('correo').value = user.correo || '';
            document.getElementById('id_rol').value = user.id_rol || '';
            document.getElementById('esEmpresa').value = user.es_empresa ? '1' : '0';
            document.getElementById('userFormSection').style.display = 'block';
            showSection(usersSection);
        } catch (error) {
            console.error(error);
            alert('No se pudo cargar el usuario para editar');
        }
    }

    async function deleteUser(id) {
        if (!confirm('¿Estás seguro de eliminar este usuario?')) return;
        try {
            const response = await fetch(`${API_BASE_URL}/users/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Error al eliminar usuario');
            fetchUsers();
        } catch (error) {
            console.error(error);
            alert('No se pudo eliminar el usuario');
        }
    }

    const userForm = document.getElementById('userForm');
    userForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = parseInt(document.getElementById('userId').value);
        const nombre = document.getElementById('nombre').value;
        const correo = document.getElementById('correo').value;
        const id_rol = parseInt(document.getElementById('id_rol').value);
        const esEmpresa = document.getElementById('esEmpresa').value === '1';

        const userData = { nombre, correo, id_rol, esEmpresa };

        try {
            let response;
            if (id) {
                response = await fetch(`${API_BASE_URL}/users/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userData)
                });
            } else {
                response = await fetch(`${API_BASE_URL}/users`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userData)
                });
            }
            if (!response.ok) throw new Error('Error al guardar usuario');
            await fetchUsers();
            renderUsersTable(await fetchUsers());
            document.getElementById('userFormSection').style.display = 'none';
        } catch (error) {
            console.error(error);
            alert('No se pudo guardar el usuario');
        }
    });

    document.getElementById('btnCancel').addEventListener('click', () => {
        document.getElementById('userFormSection').style.display = 'none';
    });

    ['btnAddUser', 'btnAddOffer', 'btnAddReport', 'btnAddMetric'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.style.display = 'none';
        }
    });

    dashboardLink.addEventListener('click', (e) => {
        e.preventDefault();
        showSection(dashboardSection);
    });

    usersLink.addEventListener('click', (e) => {
        e.preventDefault();
        showSection(usersSection);
    });

    offersLink.addEventListener('click', (e) => {
        e.preventDefault();
        showSection(offersSection);
    });

    showSection(dashboardSection);

    const administradoresLink = document.getElementById('administradoresLink');
    const administradoresSection = document.getElementById('administradoresSection');
    const administradoresTableBody = document.querySelector('#administradoresTable tbody');
    const btnAddAdministrador = document.getElementById('btnAddAdministrador');
    const administradorFormSection = document.getElementById('administradorFormSection');
    const administradorForm = document.getElementById('administradorForm');
    const btnCancelAdministrador = document.getElementById('btnCancelAdministrador');

    administradoresLink.addEventListener('click', (e) => {
        e.preventDefault();
        showSection(administradoresSection);
        fetchAdministradores();
    });

    btnAddAdministrador.addEventListener('click', () => {
        administradorFormSection.style.display = 'block';
        btnAddAdministrador.style.display = 'none';
    });

    btnCancelAdministrador.addEventListener('click', () => {
        administradorFormSection.style.display = 'none';
        btnAddAdministrador.style.display = 'block';
        administradorForm.reset();
    });

    async function fetchAdministradores() {
        try {
            const response = await fetch(`${API_BASE_URL}/administradores`, {
                method: 'GET',
                credentials: 'include'
            });
            if (!response.ok) throw new Error('Error al obtener administradores');
            const administradoresData = await response.json();
            renderAdministradoresTable(administradoresData);
        } catch (error) {
            console.error(error);
            alert('No se pudieron cargar los administradores');
        }
    }

    function renderAdministradoresTable(administradoresData) {
        administradoresTableBody.innerHTML = '';
        administradoresData.forEach(admin => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${admin.id}</td>
                <td>${admin.nombre}</td>
                <td>${admin.correo}</td>
                <td>${admin.permisos || ''}</td>
            `;
            administradoresTableBody.appendChild(tr);
        });
    }

    administradorForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id_usuario = parseInt(document.getElementById('id_usuario').value);
        const permisos = document.getElementById('permisos').value;

        try {
            const response = await fetch(`${API_BASE_URL}/administradores`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_usuario, permisos })
            });
            if (!response.ok) throw new Error('Error al asignar administrador');
            fetchAdministradores();
            administradorFormSection.style.display = 'none';
            btnAddAdministrador.style.display = 'block';
            administradorForm.reset();
        } catch (error) {
            console.error(error);
            alert('No se pudo asignar el administrador');
        }
    });
});
