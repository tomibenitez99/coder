const socket = io();

//ATRAPAN MSGS QUE ENVIE EL SERVER
socket.on('connection', () => {
  console.log("estás conectado");
});

let prod = [];
socket.on('products', (data) => {
  
  prod = data;

  let htmlToRender = '';
  for(let i = 0; i > prod.length; i++) {
    htmlToRender = htmlToRender + `
    <tr>
    <td> <h1>${prod[i].title}</h1> <td>
    <td> <h1>${prod[i].price}</h1> </td>
    <td> <img src="${prod[i].thumbnail}"/> </td>
    </tr>
    `
  }


  let htmlMap = data.map(prod =>{
    return `
    <tr>
    <td> <h1>${prod.title}</h1> </td>
    <td> <h1>${prod.price}</h1> </td>
    <td> <img src="${prod.thumbnail}"/> </td>
    </tr>
    `
});

  let htmlReduce = data.reduce((previewHtml, CurrentHtml) => previewHtml + `
  <td> <h1>${CurrentHtml.title}</h1> </td>
  <td> <h1>${CurrentHtml.price}</h1> </td>
  <tr>
  </tr>
  <td> <img src = "${CurrentHtml.thumbnail}"/> </td>
  )
  `,``
  )

  document.querySelector('#products').innerHTML = htmlReduce;

});

socket.on('chat', (data)=> {
  let htmlReduce = data.reduce((previewHtml, CurrentHtml) => previewHtml + `
  <tr>
  <td> <h1>${CurrentHtml.email}</h1> </td>
  <td> <h1>${CurrentHtml.message}</h1> </td>
  <td> <h1>${CurrentHtml.date}</h1> </td>
  </tr>
  `,``
  )
  document.querySelector('#message').innerHTML = htmlReduce;
})

function addMessage(addMessage) {
  let messageToAdd = {
    email: addMesssage.email.value,
    message: addMesssage.email.value,
    date: new Date().toLocaleDateString(),
  }
  socket.emit('newMessage', messageToAdd)
}

/* socket.on("data-generica", (data) => {
  console.log(data);
});

socket.on("arr-chat", (data) => {
  const html = data.reduce(
    (html, item) => "<div>" + item + "</div>" + html,
    ""
  );

  document.getElementById("div-chats").innerHTML = html;
});

function enviar() {
  const nombre = document.getElementById("caja-nombre").value;
  const msg = document.getElementById("caja-msg").value;
  socket.emit("data-generica", nombre + ": " + msg);
}; */