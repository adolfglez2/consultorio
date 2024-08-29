document.getElementById("buscar-paciente").addEventListener("click", function() {
    const idPaciente = document.getElementById("id-paciente").value;
    const paciente = JSON.parse(localStorage.getItem(idPaciente));

    if (paciente) {
        document.getElementById("nombre-paciente").textContent = paciente.nombre;
        document.getElementById("edad-paciente").textContent = paciente.edad;
        document.getElementById("telefono-paciente").textContent = paciente.telefono;

        document.getElementById("datos-paciente").style.display = "block";
    } else {
        alert("No se encontró un paciente con ese ID.");
        document.getElementById("datos-paciente").style.display = "none";
    }
});

document.getElementById("form-citas").addEventListener("submit", function(event) {
    event.preventDefault();

    const idPaciente = document.getElementById("id-paciente").value;
    const fechaCita = document.getElementById("fecha-cita").value;
    const horaCita = document.getElementById("hora-cita").value;

    const citas = JSON.parse(localStorage.getItem("citas")) || [];
    citas.push({ idPaciente, fechaCita, horaCita });
    localStorage.setItem("citas", JSON.stringify(citas));

    alert("Cita agendada con éxito.");
    document.getElementById("form-citas").reset();
    document.getElementById("datos-paciente").style.display = "none";
});
