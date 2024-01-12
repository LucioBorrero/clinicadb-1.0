<<<<<<< HEAD
 // Array para almacenar pacientes
=======
// Array para almacenar pacientes
>>>>>>> 9852ed04fa295e4217079158b4efabdd3b217208
const pacientes = [];

// Función para agregar un paciente
function agregarPaciente() {
    // Obtener datos del formulario
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const edad = document.getElementById('edad').value;

    // Validar que los campos no estén vacíos
    if (!nombre || !apellido || !edad) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    // Crear un objeto paciente
    const paciente = {
        nombre: nombre,
        apellido: apellido,
        edad: edad
    };

    // Agregar paciente al array
    pacientes.push(paciente);

    // Limpiar el formulario
    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
    document.getElementById('edad').value = '';

    // Actualizar la lista de pacientes
    mostrarPacientes();
}

// Función para mostrar la lista de pacientes
function mostrarPacientes() {
    const listaPacientes = document.getElementById('patientList');
    // Limpiar la lista antes de actualizar
    listaPacientes.innerHTML = '';

    // Recorrer el array de pacientes y agregar elementos a la lista
    pacientes.forEach(paciente => {
        const listItem = document.createElement('li');
        listItem.textContent = `Nombre: ${paciente.nombre} ${paciente.apellido}, Edad: ${paciente.edad}`;
        listaPacientes.appendChild(listItem);
    });
}
