let username = document.getElementById('username');
let avatar = document.getElementById('avatar');
let email = document.getElementById('email');
const socket = io();

//-----------Socket Events------------//
socket.on('deliverProducts', data => {
    fetch('templates/productsTable.hbs')
    .then(string => string.text())
    .then(template => {
        const processedTemplate = Handlebars.compile(template);
        const templateObj = {
            products:data
        }
        const html = processedTemplate(templateObj)
        let div = document.getElementById('productTable');
        div.innerHTML = html
    });
});

//-----------Fin Socket Events-----------//

fetch('/api/auth/current').then(response => response.json())
.then(data => {
    username.innerHTML = data.user.username
    avatar.innerHTML = `<img src="${data.user.avatar}" style="height: 150px; width: 150px" alt="">`
    email.innerHTML = data.user.email
    console.log(data)
});