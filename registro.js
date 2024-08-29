document.getElementById("form-registro").addEventListener("submit", function(event) {
    event.preventDefault();

    const idPaciente = document.getElementById("id-paciente").value;
    const nombre = document.getElementById("nombre").value;
    const edad = document.getElementById("edad").value;
    const telefono = document.getElementById("telefono").value;

    const paciente = { id: idPaciente, nombre, edad, telefono };
    
    localStorage.setItem(idPaciente, JSON.stringify(paciente));

    alert("Paciente registrado con éxito.");
    document.getElementById("form-registro").reset();
});
