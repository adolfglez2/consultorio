document.addEventListener('DOMContentLoaded', () => {
    const formularioCita = document.getElementById('formulario-cita');
    const listaCitas = document.getElementById('lista-citas');

    const citas = obtenerDatos('citas');
    mostrarCitas(citas);

    formularioCita.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombreCita = document.getElementById('nombre-cita').value;
        const fechaCita = document.getElementById('fecha-cita').value;
        const horaCita = document.getElementById('hora-cita').value;

        const nuevaCita = { nombreCita, fechaCita, horaCita };
        citas.push(nuevaCita);
        guardarDatos('citas', citas);

        mostrarCitas(citas);
        formularioCita.reset();
    });

    function mostrarCitas(citas) {
        listaCitas.innerHTML = '';

        citas.forEach((cita, index) => {
            const li = document.createElement('li');
            li.textContent = `${cita.nombreCita} - ${cita.fechaCita} a las ${cita.horaCita}`;
            
            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.onclick = () => {
                citas.splice(index, 1);
                guardarDatos('citas', citas);
                mostrarCitas(citas);
            };

            li.appendChild(botonEliminar);
            listaCitas.appendChild(li);
        });
    }

    function guardarDatos(clave, valor) {
        localStorage.setItem(clave, JSON.stringify(valor));
    }

    function obtenerDatos(clave) {
        return JSON.parse(localStorage.getItem(clave)) || [];
    }
});
