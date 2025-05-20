
        const domain_railway = "https://red-de-empleo-production.up.railway.app";
        const API_URL =
        window.location.hostname === 'localhost'
            ? 'http://localhost:3000' // 🚧 Desarrollo local
            : domain_railway // ✅ Producción en Railway (cambia esto)

        document.addEventListener('DOMContentLoaded', async () => {
            // Elementos del DOM
            const formulario = document.getElementById('formularioEmpleo');
            const btnMostrarForm = document.getElementById('btnMostrarFormulario');
            const btnCancelar = document.getElementById('btnCancelar');
            
            // Cargar empleos al iniciar
            await cargarEmpleos();
            
            // Mostrar/ocultar formulario
            btnMostrarForm.addEventListener('click', () => {
                formulario.classList.toggle('visible');
                if (formulario.classList.contains('visible')) {
                    btnMostrarForm.textContent = 'Ocultar Formulario';
                } else {
                    btnMostrarForm.textContent = 'Publicar Nuevo Empleo';
                }
            });
            
            // Cancelar formulario
            btnCancelar.addEventListener('click', () => {
                formulario.classList.remove('visible');
                btnMostrarForm.textContent = 'Publicar Nuevo Empleo';
                document.getElementById('formNuevoEmpleo').reset();
            });
            
            // Manejar envío del formulario
            document.getElementById('formNuevoEmpleo').addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const token = localStorage.getItem('token');
                const empleadorId = localStorage.getItem('userId');
                
                if (!token || !empleadorId) {
                    alert('Debes iniciar sesión como empleador para publicar empleos');
                    return;
                }

                const empleoData = {
                    id_empleador: empleadorId,
                    titulo: document.getElementById('titulo').value,
                    descripcion: document.getElementById('descripcion').value,
                    ubicacion: document.getElementById('ubicacion').value,
                    requisitos: document.getElementById('requisitos').value,
                    categoria_id: document.getElementById('categoria_id').value
                };

                try {
                    const response = await fetch(`${API_URL}/api/jobs`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify(empleoData)
                    });

                    const result = await response.json();
                    
                    if (response.ok) {
                        alert('¡Empleo publicado con éxito!');
                        document.getElementById('formNuevoEmpleo').reset();
                        formulario.classList.remove('visible');
                        btnMostrarForm.textContent = 'Publicar Nuevo Empleo';
                        await cargarEmpleos();
                    } else {
                        throw new Error(result.error || 'Error al publicar empleo');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert(error.message);
                }
            });

            // Manejar filtros
            document.getElementById('btnFiltrar').addEventListener('click', cargarEmpleos);
        });

        // Función para cargar empleos
        async function cargarEmpleos() {
            try {
                const categoria = document.getElementById('filtro-categoria').value;
                const ubicacion = document.getElementById('filtro-ubicacion').value;
                
                let url = `${API_URL}/api/jobs`;
                const params = [];
                
                if (categoria) params.push(`categoria_id=${categoria}`);
                if (ubicacion) params.push(`ubicacion=${ubicacion}`);
                
                if (params.length > 0) {
                    url += `?${params.join('&')}`;
                }

                const response = await fetch(url);
                const empleos = await response.json();
                
                const listaEmpleos = document.getElementById('lista-empleos');
                listaEmpleos.innerHTML = '';
                
                if (empleos.length === 0) {
                    listaEmpleos.innerHTML = '<p>No se encontraron empleos con esos filtros</p>';
                    return;
                }

                empleos.forEach(empleo => {
                    const empleoElement = document.createElement('div');
                    empleoElement.className = 'empleo';
                    empleoElement.innerHTML = `
                        <h3>${empleo.titulo}</h3>
                        <p><strong>Descripción:</strong> ${empleo.descripcion || 'No especificado'}</p>
                        <p><strong>Ubicación:</strong> ${empleo.ubicacion || 'No especificado'}</p>
                        <p><strong>Requisitos:</strong> ${empleo.requisitos || 'No especificados'}</p>
                        <a href="#" class="btn" data-id="${empleo.id}">Postular</a>
                    `;
                    listaEmpleos.appendChild(empleoElement);
                });
            } catch (error) {
                console.error('Error al cargar empleos:', error);
                document.getElementById('lista-empleos').innerHTML = '<p>Error al cargar los empleos</p>';
            }
        }