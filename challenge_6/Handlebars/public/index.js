const socket = io();

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
  };
  
  document.querySelector("#products").innerHTML = htmlToRender;
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