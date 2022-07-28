const http = require("http");
const moment = require("moment");

const server = http.createServer((peticion, respuesta) => {
    moment().format('h');
    respuesta.end(moment().format('h'));
});

const connectedServer = server.listen(8080, () => {
  console.log(
    `Servidor Http escuchando en el puerto ${connectedServer.address().port}`
  );
});
