function togglePasswordVisibility() {
    const passwordInput = document.getElementById('contrasena');
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
}

async function submitForm(event) {
    event.preventDefault();

    const correo = document.getElementById('correo').value;
    const contrasena = document.getElementById('contrasena').value;
    const accountType = document.getElementById('accountType').value;

    try {
        const response = await fetch('http://localhost:82/APIproyectofinal/api-rest/Login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                correo,
                contrasena,
                accountType,
            }),
        });

        if (response.ok) {
            const data = await response.json();

            if (data.success && data.token) {
                localStorage.setItem('token', data.token);
                alert('Inicio de sesión exitoso');
                // Redirigir a otra página o realizar otras acciones después del inicio de sesión
            } else {
                alert('Error de inicio de sesión: Credenciales incorrectas');
            }
        } else {
            alert('Error en la solicitud: ' + response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error de red');
    }
}