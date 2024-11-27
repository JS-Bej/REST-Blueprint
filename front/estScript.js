document.getElementById('estudianteForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const estudiante = {
        cod_e: document.getElementById('cod_e').value,
        nom_e: document.getElementById('nom_e').value,
        dir_e: document.getElementById('dir_e').value,
        tel_e: document.getElementById('tel_e').value,
        fech_nac: document.getElementById('fech_nac').value
    };

    fetch('http://localhost:3000/estudiantes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(estudiante),
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch((error) => console.error('Error:', error));
        alert("Estudiante agregado exitosamente.")
});