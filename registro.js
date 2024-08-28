document.addEventListener('DOMContentLoaded', () => {
    const formularioPaciente = document.getElementById('formulario-paciente');
    const listaPacientes = document.getElementById('lista-pacientes');
    const editandoIndice = document.getElementById('editando-indice');

    const pacientes = obtenerDatos('pacientes');
    mostrarPacientes(pacientes);

    formularioPaciente.addEventListener('submit', (e) => {
        e.preventDefault();

        const idPaciente = document.getElementById('id-paciente').value;
        const nombrePaciente = document.getElementById('nombre-paciente').value;
        const edadPaciente = document.getElementById('edad-paciente').value;
        const telefonoPaciente = document.getElementById('telefono-paciente').value;

        const nuevoPaciente = { idPaciente, nombrePaciente, edadPaciente, telefonoPaciente };

        const indice = editandoIndice.value;
        if (indice === "-1") {
            // Si no estamos editando, agregamos un nuevo paciente
            pacientes.push(nuevoPaciente);
        } else {
            // Si estamos editando, actualizamos el paciente
            pacientes[indice] = nuevoPaciente;
            editandoIndice.value = "-1"; // Reseteamos el índice
        }

        guardarDatos('pacientes', pacientes);
        mostrarPacientes(pacientes);
        formularioPaciente.reset();
    });

    function mostrarPacientes(pacientes) {
        listaPacientes.innerHTML = '';

        pacientes.forEach((paciente, index) => {
            const li = document.createElement('li');
            li.textContent = `ID: ${paciente.idPaciente} - ${paciente.nombrePaciente} - Edad: ${paciente.edadPaciente} - Teléfono: ${paciente.telefonoPaciente}`;
            
            const botonEditar = document.createElement('button');
            botonEditar.textContent = 'Editar';
            botonEditar.onclick = () => {
                document.getElementById('id-paciente').value = paciente.idPaciente;
                document.getElementById('nombre-paciente').value = paciente.nombrePaciente;
                document.getElementById('edad-paciente').value = paciente.edadPaciente;
                document.getElementById('telefono-paciente').value = paciente.telefonoPaciente;
                editandoIndice.value = index;
            };

            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.onclick = () => {
                pacientes.splice(index, 1);
                guardarDatos('pacientes', pacientes);
                mostrarPacientes(pacientes);
            };

            li.appendChild(botonEditar);
            li.appendChild(botonEliminar);
            listaPacientes.appendChild(li);
        });
    }

    function guardarDatos(clave, valor) {
        localStorage.setItem(clave, JSON.stringify(valor));
    }

    function obtenerDatos(clave) {
        return JSON.parse(localStorage.getItem(clave)) || [];
    }
});
