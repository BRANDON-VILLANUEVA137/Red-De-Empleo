document.addEventListener('DOMContentLoaded', () => {
    const dashboardLink = document.getElementById('dashboardLink');
    const usersLink = document.getElementById('usersLink');
    const offersLink = document.getElementById('offersLink');
    const reportsLink = document.getElementById('reportsLink');
    const metricsLink = document.getElementById('metricsLink');

    const dashboardSection = document.getElementById('dashboardSection');
    const usersSection = document.getElementById('usersSection');
    const offersSection = document.getElementById('offersSection');
    const reportsSection = document.getElementById('reportsSection');
    const metricsSection = document.getElementById('metricsSection');

    function showSection(sectionToShow) {
        dashboardSection.style.display = 'none';
        usersSection.style.display = 'none';
        offersSection.style.display = 'none';
        reportsSection.style.display = 'none';
        metricsSection.style.display = 'none';

        sectionToShow.style.display = 'block';

        dashboardLink.classList.remove('active');
        usersLink.classList.remove('active');
        offersLink.classList.remove('active');
        reportsLink.classList.remove('active');
        metricsLink.classList.remove('active');

        if (sectionToShow === dashboardSection) {
            dashboardLink.classList.add('active');
        } else if (sectionToShow === usersSection) {
            usersLink.classList.add('active');
            fetchUsers();
        } else if (sectionToShow === offersSection) {
            offersLink.classList.add('active');
            fetchOffers();
        } else if (sectionToShow === reportsSection) {
            reportsLink.classList.add('active');
            fetchReports();
        } else if (sectionToShow === metricsSection) {
            metricsLink.classList.add('active');
            fetchMetrics();
        }
    }

    // Base URL for backend API
    const API_BASE_URL = 'https://red-de-empleo-production.up.railway.app/api/admin';

    // Funciones para obtener datos desde el backend con prefijo /api/admin
    async function fetchUsers() {
    try {
        const response = await fetch(`${API_BASE_URL}/users`, {
            method: 'GET',
            credentials: 'include' // ✅ Aquí correctamente colocado
        });

        if (!response.ok) throw new Error('Error al obtener usuarios');
        const usersData = await response.json();
        renderUsersTable(usersData);
        
    } catch (error) {
        console.error(error);
        alert('No se pudieron cargar los usuarios');
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

async function fetchReports() {
    try {
        const response = await fetch(`${API_BASE_URL}/reports`, {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) throw new Error('Error al obtener reportes');
        const reportsData = await response.json();
        renderReportsTable(reportsData);
    } catch (error) {
        console.error(error);
        alert('No se pudieron cargar los reportes');
    }
}

async function fetchMetrics() {
    try {
        const response = await fetch(`${API_BASE_URL}/metrics`, {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) throw new Error('Error al obtener métricas');
        const metricsData = await response.json();
        renderMetricsTable(metricsData);
    } catch (error) {
        console.error(error);
        alert('No se pudieron cargar las métricas');
    }
}

    // Funciones para renderizar tablas con datos reales y mapeo de campos snake_case a camelCase
    const usersTableBody = document.querySelector('#usersTable tbody');
    function renderUsersTable(usersData) {
        usersTableBody.innerHTML = '';
        usersData.forEach(user => {
            const esEmpresa = user.es_empresa || user.esEmpresa || false;
            const rol = user.id_rol || user.rol || 'N/A';
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${user.id}</td>
                <td>${user.nombre}</td>
                <td>${user.correo || user.email || ''}</td>
                <td>${rol}</td>
                <td>${esEmpresa ? 'Sí' : 'No'}</td>
                <td>
                    <button class="editUserBtn" data-id="${user.id}">Editar</button>
                    <button class="deleteUserBtn" data-id="${user.id}">Eliminar</button>
                </td>
            `;
            usersTableBody.appendChild(tr);
        });
    }

    const offersTableBody = document.querySelector('#offersTable tbody');
    function renderOffersTable(offersData) {
        offersTableBody.innerHTML = '';
        offersData.forEach(offer => {
            const empresaId = offer.empresa_id || offer.empresaId;
            const fechaPublicacion = offer.fecha_publicacion || offer.fechaPublicacion;
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${offer.id}</td>
                <td>${offer.titulo}</td>
                <td>${offer.descripcion}</td>
                <td>${empresaId}</td>
                <td>${fechaPublicacion}</td>
                <td>
                    <button class="editOfferBtn" data-id="${offer.id}">Editar</button>
                    <button class="deleteOfferBtn" data-id="${offer.id}">Eliminar</button>
                </td>
            `;
            offersTableBody.appendChild(tr);
        });
    }

    const reportsTableBody = document.querySelector('#reportsTable tbody');
    function renderReportsTable(reportsData) {
        reportsTableBody.innerHTML = '';
        reportsData.forEach(report => {
            const fechaReporte = report.fecha_reporte || report.fechaReporte;
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${report.id}</td>
                <td>${report.titulo}</td>
                <td>${report.descripcion}</td>
                <td>${fechaReporte}</td>
                <td>
                    <button class="editReportBtn" data-id="${report.id}">Editar</button>
                    <button class="deleteReportBtn" data-id="${report.id}">Eliminar</button>
                </td>
            `;
            reportsTableBody.appendChild(tr);
        });
    }

    const metricsTableBody = document.querySelector('#metricsTable tbody');
    function renderMetricsTable(metricsData) {
        metricsTableBody.innerHTML = '';
        metricsData.forEach(metric => {
            const fechaMedicion = metric.fecha_medicion || metric.fechaMedicion;
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${metric.id}</td>
                <td>${metric.nombre}</td>
                <td>${metric.valor}</td>
                <td>${fechaMedicion}</td>
                <td>
                    <button class="editMetricBtn" data-id="${metric.id}">Editar</button>
                    <button class="deleteMetricBtn" data-id="${metric.id}">Eliminar</button>
                </td>
            `;
            metricsTableBody.appendChild(tr);
        });
    }

    // Event delegation para botones editar y eliminar usuarios
    usersTableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('editUserBtn')) {
            const userId = e.target.getAttribute('data-id');
            editUser(userId);
        } else if (e.target.classList.contains('deleteUserBtn')) {
            const userId = e.target.getAttribute('data-id');
            deleteUser(userId);
        }
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

    // Manejo del formulario de usuario
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
            fetchUsers();
            document.getElementById('userFormSection').style.display = 'none';
        } catch (error) {
            console.error(error);
            alert('No se pudo guardar el usuario');
        }
    });

    // Cancelar formulario
    document.getElementById('btnCancel').addEventListener('click', () => {
        document.getElementById('userFormSection').style.display = 'none';
    });

    // Ocultar botones de agregar si existen
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

    reportsLink.addEventListener('click', (e) => {
        e.preventDefault();
        showSection(reportsSection);
    });

    metricsLink.addEventListener('click', (e) => {
        e.preventDefault();
        showSection(metricsSection);
    });

    showSection(dashboardSection);
});
