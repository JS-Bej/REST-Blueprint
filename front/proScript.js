document.getElementById('profesorForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const profesor = {
        id_p: document.getElementById('id_p').value,
        nom_p: document.getElementById('nom_p').value,
        dir_p: document.getElementById('dir_p').value,
        tel_p: document.getElementById('tel_p').value,
        profesion: document.getElementById('profesion').value
    };

    fetch('http://localhost:3000/profesores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(profesor),
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch((error) => console.error('Error:', error));
        alert("Profesor agregado exitosamente.")
});