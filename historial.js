// Variables para los formularios y botones
const crearHistorialBtn = document.getElementById('crear-historial-btn');
const buscarHistorialBtn = document.getElementById('buscar-historial-btn');
const formularioBusqueda = document.getElementById('formulario-busqueda');
const formularioCreacion = document.getElementById('formulario-creacion');
const historialMedico = document.getElementById('historial-medico');
const listaNotas = document.getElementById('lista-notas');
const agregarNotaBtn = document.getElementById('agregar-nota-btn');

// Mostrar el formulario de búsqueda o creación según la opción elegida
crearHistorialBtn.addEventListener('click', () => {
    formularioCreacion.style.display = 'block';
    formularioBusqueda.style.display = 'none';
    historialMedico.style.display = 'none';
});

buscarHistorialBtn.addEventListener('click', () => {
    formularioBusqueda.style.display = 'block';
    formularioCreacion.style.display = 'none';
    historialMedico.style.display = 'none';
});

// Función para agregar notas al historial
formularioCreacion.addEventListener('submit', (e) => {
    e.preventDefault();
    const idPaciente = document.getElementById('id-creacion').value;
    const nota = document.getElementById('historial-notas').value;

    let historial = JSON.parse(localStorage.getItem(idPaciente)) || [];
    historial.push(nota);
    localStorage.setItem(idPaciente, JSON.stringify(historial));

    alert('Nota agregada al historial.');
    document.getElementById('historial-notas').value = '';
    mostrarHistorial(idPaciente);
});

// Función para buscar y mostrar el historial del paciente
formularioBusqueda.addEventListener('submit', (e) => {
    e.preventDefault();
    const idPaciente = document.getElementById('id-busqueda').value;
    mostrarHistorial(idPaciente);
});

// Mostrar historial y permitir agregar nuevas notas
function mostrarHistorial(idPaciente) {
    const historial = JSON.parse(localStorage.getItem(idPaciente)) || [];
    listaNotas.innerHTML = '';

    historial.forEach((nota, index) => {
        const li = document.createElement('li');
        li.textContent = `Nota ${index + 1}: ${nota}`;
        listaNotas.appendChild(li);
    });

    historialMedico.style.display = 'block';
    formularioBusqueda.style.display = 'none';
    formularioCreacion.style.display = 'none';

    agregarNotaBtn.addEventListener('click', () => {
        formularioCreacion.style.display = 'block';
        historialMedico.style.display = 'none';
        document.getElementById('id-creacion').value = idPaciente;
    });
}
