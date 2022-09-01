const Product = require("./model/product.js");
const express = require("express");
const routerProduct = require("./routers/router-product.js");
const routerCart = require("./routers/router-cart.js");
const e = require("express");
const { Router } = express;
const app = express();
const PORT = process.env.PORT || 8080;

const USER = "admin";
const PASSWORD = "admin";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(__dirname + "/public"));
app.use("/api/productos", routerProduct);
app.use("/api/carrito", routerCart);


const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));