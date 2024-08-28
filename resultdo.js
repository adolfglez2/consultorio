document.addEventListener('DOMContentLoaded', () => {
    const resultadoHistorial = document.getElementById('resultado-historial');

    const urlParams = new URLSearchParams(window.location.search);
    const idPaciente = urlParams.get('id');

    const pacientes = obtenerDatos('pacientes');
    const historiales = obtenerDatos('historiales');
    const paciente = pacientes.find(p => p.idPaciente === idPaciente);
    const historial = historiales.find(h => h.idPaciente === idPaciente);

    if (paciente) {
        let historialContent = `
            <h2>Información del Paciente</h2>
            <p><strong>ID:</strong> ${paciente.idPaciente}</p>
            <p><strong>Nombre:</strong> ${paciente.nombrePaciente}</p>
            <p><strong>Edad:</strong> ${paciente.edadPaciente}</p>
            <p><strong>Teléfono:</strong> ${paciente.telefonoPaciente}</p>
        `;

        if (historial) {
            historialContent += `
                <h2>Historial Médico</h2>
                <p><strong>Fecha:</strong> ${historial.fecha}</p>
                <p><strong>Notas:</strong> ${historial.notas}</p>
            `;
        } else {
            historialContent += `<p>No se encontró un historial médico para este paciente.</p>`;
        }

        resultadoHistorial.innerHTML = historialContent;
    } else {
        resultadoHistorial.innerHTML = `<p>No se encontró un paciente con el ID proporcionado.</p>`;
    }

    function obtenerDatos(clave) {
        return JSON.parse(localStorage.getItem(clave)) || [];
    }
});
