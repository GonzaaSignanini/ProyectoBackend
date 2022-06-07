document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault()
    const form = document.getElementById('loginForm')
    const formData = new FormData(form)

    const user = {
        username: formData.get('username'),
        password: formData.get('password')
    }

fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
    'Content-Type': 'application/json'
    }
})
    .then(res => { 
        if (res.status === 200) {
            if(user.username == "admin" && user.password == 123456) {
                location.replace('home2');
            } else {
                location.replace('home');
            }
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'The Username or Password are incorrect.',
                icon: 'error',
            })
        }
    })
});