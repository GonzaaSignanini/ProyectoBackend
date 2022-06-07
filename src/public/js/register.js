const form = document.getElementById('registerForm')
form.addEventListener('submit', (e) => {
    e.preventDefault()

    const formData = new FormData(form)

    const user = {
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
        phone: formData.get('phone'),
        age: formData.get('age'),
        address: formData.get('address'),
        avatar: formData.get('avatar')
    }

    if (!user.username || !user.email || !user.password || !user.phone || !user.age || !user.address || user.avatar.size === 0 ) {
        Swal.fire({
        title: 'Error!',
        text: 'The fields have to be completed.',
        icon: 'error',
        })
    } else {
        fetch('api/auth/register', {
        method: 'POST',
        body: formData
        })
        .then(res => {
            if (res.status === 201) {
                form.reset()
                Swal.fire({
                    title: 'Registered!',
                    text: 'You have been successfully registered.',
                    icon: 'success',
                })
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'User not created.',
                    icon: 'error',
                })
            }
        })
    }
});

