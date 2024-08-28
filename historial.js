document.addEventListener('DOMContentLoaded', () => {
    const crearHistorialBtn = document.getElementById('crear-historial-btn');
    const buscarHistorialBtn = document.getElementById('buscar-historial-btn');
    const formularioBusqueda = document.getElementById('formulario-busqueda');
    const formularioCreacion = document.getElementById('formulario-creacion');

    crearHistorialBtn.addEventListener('click', () => {
        formularioBusqueda.style.display = 'none';
        formularioCreacion.style.display = 'block';
    });

    buscarHistorialBtn.addEventListener('click', () => {
        formularioBusqueda.style.display = 'block';
        formularioCreacion.style.display = 'none';
    });

    formularioBusqueda.addEventListener('submit', (e) => {
        e.preventDefault();
        const idBusqueda = document.getElementById('id-busqueda').value;

        // Redirige a la página de resultados pasando el ID del paciente en la URL
        window.location.href = `resultado.html?id=${idBusqueda}`;
    });

    formularioCreacion.addEventListener('submit', (e) => {
        e.preventDefault();
        const idCreacion = document.getElementById('id-creacion').value;
        const notas = document.getElementById('historial-notas').value;

        const pacientes = obtenerDatos('pacientes');
        const paciente = pacientes.find(p => p.idPaciente === idCreacion);

        if (paciente) {
            let historiales = obtenerDatos('historiales');
            const nuevoHistorial = {
                idPaciente: idCreacion,
                notas: notas,
                fecha: new Date().toLocaleDateString(),
            };
            historiales.push(nuevoHistorial);
            guardarDatos('historiales', historiales);

            alert('Historial creado exitosamente.');
            formularioCreacion.reset();
        } else {
            alert('No se encontró un paciente con el ID proporcionado.');
        }
    });

    function obtenerDatos(clave) {
        return JSON.parse(localStorage.getItem(clave)) || [];
    }

    function guardarDatos(clave, datos) {
        localStorage.setItem(clave, JSON.stringify(datos));
    }
});
