let email = document.getElementById('email')
let username = document.getElementById('username')
let age = document.getElementById('age')
let alias = document.getElementById('alias')
let avatar = document.getElementById('avatar')
let input = document.getElementById('message')
let submit = document.getElementById('submit')

const socket = io()


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

submit.addEventListener('click', () => {
    let date = new Date()
    if(input.value && email.value){
        socket.emit('message', 
            {
                author:{
                    id:email.value,
                    username: username.value,
                    age:age.value,
                    alias:alias.value,
                    avatar:avatar.value,
                },
            text:message.value, 
            date:date.toLocaleString()
            }
    )}else{
        console.log('message not send')
    }
})

socket.on('messagelog', data => {
    let divLog = document.getElementById('log')
    let allMessages = data.map(message => {
        return  `<div class="d-flex justify-content-center align-items-center">
                    <p class="user me-1">${message.author.id}</p>
                    <p class="date me-2">[${message.date}]:</p>
                    <p class="message">${message.text}</p>
                    <div class="ms-2">
                        <img src=${message.author.avatar} class=" rounded-circle w-25"/>
                    </div>
                </div>`
    }).join('')
    divLog.innerHTML = allMessages
})



//-----------Fin Socket Events-----------//

const sendForm = (event) => {
    event.preventDefault()
    let form = document.querySelector('#productForm')
    let data = new FormData(form)

    fetch('/api/products', {
        method: 'POST',
        body: data,
    }).then(res => {
        return res.status(200);
    }).then(json => {
        console.log(json)
        return {status: 200, message:"Producto Agregado"}
    })
    .then(result => location.href='/')
}

document.addEventListener('submit', sendForm);