const Products = require("./products.js");
const { options } = require("./options/optionsMDB.js");
const knex = require("knex")(options);
const script = require("./options/script.js")
const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const Container = require("./container.js");
const httpServer = require("http").createServer(app);
const io = require('socket.io')(httpServer, {
  cors: { origin: '*', },
});
const PORT = 8080;


const server = httpServer.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on('error', (error) => console.log(`Error en servidor ${error}`));
app.use('/public', express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'hbs');
app.set('views', './views');
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
  })
);

script(knex);

let productsFruits = [
  { id: 1, title: 'Banana', price: 40, thumbnail: 'http://localhost:8080/public/banana.png'},
  { id: 2, title: 'Kiwi', price: 100, thumbnail: 'http://localhost:8080/public/kiwi.jpg'},
  { id: 3, title: 'Coco', price: 350, thumbnail: 'http://localhost:8080/public/Coco.jpg'},
];

let chat = [];

let container = new Container("product", knex);

//SOCKETS
io.on("connection", (socket) => {
  console.log("New connection");
  let container = new Container("product", knex);
  io.sockets.emit('chat', chat);

  socket.on('newMessage', (msg) => {
    chat.push(msg);
    io.sockets.emit('chat', chat);
  });

  socket.on('addProduct', (data) => {
    console.log(data);
    container.save(data);
  });
});

app.get('/', (req, res) => {
  res.render('productslist', { products: container.getAll(), productsExist: true });
});