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
        } else if (sectionToShow === offersSection) {
            offersLink.classList.add('active');
        } else if (sectionToShow === reportsSection) {
            reportsLink.classList.add('active');
        } else if (sectionToShow === metricsSection) {
            metricsLink.classList.add('active');
        }
    }

    // Datos de ejemplo para usuarios
    const usersData = [
        { id: 1, nombre: 'Juan Perez', email: 'juan@example.com', esEmpresa: false },
        { id: 2, nombre: 'Empresa XYZ', email: 'contacto@xyz.com', esEmpresa: true }
    ];

    const usersTableBody = document.querySelector('#usersTable tbody');

    function renderUsersTable() {
        usersTableBody.innerHTML = '';
        usersData.forEach(user => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${user.id}</td>
                <td>${user.nombre}</td>
                <td>${user.email}</td>
                <td>${user.esEmpresa ? 'Sí' : 'No'}</td>
                <td>
                    <button class="editUserBtn" data-id="${user.id}">Editar</button>
                    <button class="deleteUserBtn" data-id="${user.id}">Eliminar</button>
                </td>
            `;
            usersTableBody.appendChild(tr);
        });
    }

    // Event delegation for edit and delete buttons
    usersTableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('editUserBtn')) {
            const userId = e.target.getAttribute('data-id');
            editUser(userId);
        } else if (e.target.classList.contains('deleteUserBtn')) {
            const userId = e.target.getAttribute('data-id');
            deleteUser(userId);
        }
    });

    function editUser(id) {
        const user = usersData.find(u => u.id == id);
        if (!user) return;
        document.getElementById('userId').value = user.id;
        document.getElementById('nombre').value = user.nombre;
        document.getElementById('email').value = user.email;
        document.getElementById('esEmpresa').value = user.esEmpresa ? '1' : '0';
        document.getElementById('userFormSection').style.display = 'block';
        showSection(usersSection);
    }

    function deleteUser(id) {
        const index = usersData.findIndex(u => u.id == id);
        if (index === -1) return;
        if (confirm('¿Estás seguro de eliminar este usuario?')) {
            usersData.splice(index, 1);
            renderUsersTable();
        }
    }

    // Handle user form submit
    const userForm = document.getElementById('userForm');
    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = parseInt(document.getElementById('userId').value);
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const esEmpresa = document.getElementById('esEmpresa').value === '1';

        const userIndex = usersData.findIndex(u => u.id === id);
        if (userIndex !== -1) {
            usersData[userIndex] = { id, nombre, email, esEmpresa };
        }
        renderUsersTable();
        document.getElementById('userFormSection').style.display = 'none';
    });

    // Cancel button hides form
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
