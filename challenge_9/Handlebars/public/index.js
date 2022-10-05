const socket = io();

socket.on('connection', () => {
  console.log("estás conectado");
});

let prod = [];

socket.on('products', (data) => {

  let htmlReduce = data.reduce((previewHtml, CurrentHtml) => previewHtml + `
    <tr>
    <td> <h1>${CurrentHtml.title}&ensp;</h1> <td>
    <td> <h1>${CurrentHtml.price}&ensp;</h1> </td>
    <td> <img src="${CurrentHtml.thumbnail}"/> </td>
    </tr>
    `,``
  )
  
  document.querySelector("#products").innerHTML = htmlReduce;
});

socket.on('chat', (data)=> {
  let htmlReduce = data.reduce((previewHtml, CurrentHtml) => previewHtml + `
  <tr>
  <td> <h1>${CurrentHtml.email}&ensp;</h1> </td>
  <td> <h1>${CurrentHtml.date}&ensp;</h1> </td>
  <td> <h1>${CurrentHtml.message}</h1> </td>
  </tr>
  `,``
  )
  document.querySelector("#message").innerHTML = htmlReduce;
})

function addMessage(addMessage) {
  let messageToAdd = {
    email: addMessage.email.value,
    message: addMessage.message.value,
    date: new Date().toLocaleDateString(),
  }
  socket.emit('newMessage', messageToAdd)
}

function addProduct(addProduct) {
  let productToAdd = {
    title: addProduct.title.value,
    price: addProduct.price.value,
    thumbnail: addProduct.thumbnail.value,
  }
  socket.emit('addProduct', productToAdd)
}