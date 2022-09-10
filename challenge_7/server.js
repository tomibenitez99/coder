const { sqliteOptions } = require("./options/SQLite3.js")
const knexSqlite = require('knex')(sqliteOptions);
const Products = require("./products.js");
const { options } = require("./options/optionsMDB.js");
const knex = require("knex")(options);
const script = require("./options/script.js");
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

script(knex, knexSqlite);

let productsFruits = [
 /* { id: 1, name: 'Banana', price: 40, thumbnail: 'http://localhost:8080/public/banana.png'},
  { id: 2, name: 'Kiwi', price: 100, thumbnail: 'http://localhost:8080/public/kiwi.jpg'},
  { id: 3, name: 'Coco', price: 350, thumbnail: 'http://localhost:8080/public/Coco.jpg'},*/
];

let chat = [];

let container = new Container("product", knex);
let chatContainer = new Container("chat", knexSqlite);


//SOCKETS
io.on("connection", (socket) => {
  console.log("New connection");
  chatContainer.getAll().then(chat => {
    io.sockets.emit('chat', chat);
  });
  container.getAll().then(prods => {
    io.sockets.emit('products', prods);
  });

  socket.on('newMessage', (msg) => {  

    chat.push(msg);
    chatContainer.save(msg);
    io.sockets.emit('chat', chat);
  });

  socket.on('addProduct', (data) => {
    container.save(data);
    productsFruits.push(data);
    io.sockets.emit('products', productsFruits);
  });
});

app.get('/', (req, res) => {
    container.getAll()
    .then(p => {
      prods = p.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        thumbnail: item.thumbnail
      }));
      res.render('productslist', { products: prods, productsExist: true });
    }
  );
});