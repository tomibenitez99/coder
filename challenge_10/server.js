import Products from "./products.js";
import ProductFaker from "./faker/ProductFaker.js";
import express from "express";
const app = express();
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { createServer } from "http";
const httpServer = createServer(app);
const io = new Server(httpServer, {cors: { origin: '*', }});
const PORT = 8080;

const server = httpServer.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on('error', (error) => console.log(`Error en servidor ${error}`));
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
app.use(express.static(__dirname + "/public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

let products = [];

let chat = [];

//SOCKETS
io.on("connection", (socket) => {
  console.log("New connection")
  io.sockets.emit('chat', chat);
  io.sockets.emit('products', products);

  socket.on('newMessage', (msg) => {
    chat.push(msg);
    io.sockets.emit('chat', chat);
  });

  socket.on('addProduct', (data) => {
    productsFruits.push(data);
    io.sockets.emit('products', productsFruits);
  });
});

app.get('/', (req, res) => {
  let productFaker = new ProductFaker();
  products = productFaker.createProducts(5);
  console.log(products);
  res.render('productslist', { products: products, productsExist: true });
});