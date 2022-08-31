const Products = require("./products.js");
const express = require('express');
const { Router } = express;
const app = express();
const router = Router();
const { engine } = require('express-handlebars');
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

app.use('/products', router);

let productsFruits = [
  { id: 1, title: 'Banana', price: 40, thumbnail: 'http://localhost:8080/public/banana.png'},
  { id: 2, title: 'Kiwi', price: 100, thumbnail: 'http://localhost:8080/public/kiwi.jpg'},
  { id: 3, title: 'Coco', price: 350, thumbnail: 'http://localhost:8080/public/Coco.jpg'},
];

let products = new Products(productsFruits);

let chat = [];

//SOCKETS
io.on("connection", (socket) => {
  console.log("New connection")
  io.sockets.emit('chat', chat);
  io.sockets.emit('products', products.getAll());

  socket.on('newMessage', (msg) => {
    chat.push(msg);
    io.sockets.emit('chat', chat);
  });

  socket.on('addProduct', (data) => {
    products.addOne(data);
    io.sockets.emit('products', products.getAll());
  });
});


router.delete('/:id', (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  const deletedProduct = products.deleteOne(id);
  console.log(products.getAll());
  if(deletedProduct) {
      res.json({ success: 'ok', id });
  } else {
      res.json({ error: 'producto no encontrado'});
  }
});

router.put('/:id', (req, res) => {
  let { id } = req.params;
  const { body } = req;
  id = parseInt(id);
  const changedProduct = products.updateOne(id, body);
  if(changedProduct) {
      res.json({ success: 'ok', new: changedProduct });
  } else {
      res.json({ error: 'producto no encontrado' });
  }
});

router.post('/', (req, res) => {
  console.log('estoy acá');
  const { body } = req;
  body.price = parseFloat(body.price);
  const productoGenerado = products.addOne(body);
  res.json({ success: 'ok', new: productoGenerado });
});

router.get('/', (req, res) => {
  res.render('productslist.hbs', { products: products.getAll(), productsExist: true });
});

router.get('/:id', (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  const found = products.findOne(id);
  if(found) {
      res.json(found);
  } else {
      res.json({ error: 'producto no encontrado' });
  }
});

app.get('/', (req, res) => {
  res.render('hello.hbs', { msg: 'frutas' });
});

app.get("/chat", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});