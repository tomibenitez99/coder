const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));

app.get("/", (req, res) => {
  res.send({ mensaje: "oia muio" });
});

app.get("/du", (req, res) => {
  res.send({ id: 0, nombre: "iuiu", edad: 1 });
});