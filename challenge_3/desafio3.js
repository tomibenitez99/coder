const express = require("express");
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 8080;

class Contenedor {
    constructor(fileName) {
        this.fileName = "./archivos/" + fileName + ".txt";
    }

    async save(data) {
        try {
            let contenidoEnJson = JSON.parse(await this.readFile(this.fileName, "utf-8"));
            data.id = contenidoEnJson.length + 1;
            contenidoEnJson.push(data);
            console.log("se ha insertado el id: " + data.id);
            await this.simpleSave(contenidoEnJson);
            return data.id;
        } catch (error) {
            console.log(error)
        }
    }


    async getById(id) {
        let array = await this.getAll();
        for (let i = 0; i < array.length; i++) {
            if (array[i].id == id) {
                return array[i];
            }
        }
        return null;
    }


    async getAll() {
        try {
            let data = await this.readFile(this.fileName);
            return JSON.parse(data);
        } catch (error) {
            console.log(error);
        }
    }


    async deleteById(id) {
        let array = await this.getAll();
        let position = this.findPosition(id, array);
        console.log(position);
        array.splice(position, 1);
        console.log(array);
        await this.simpleSave(array);
    }


    async deleteAll() {
        await this.simpleSave([]);
    }


    //FUNCIONES AUXILIARES:
    async simpleSave(data) {
        await fs.promises.writeFile(this.fileName, JSON.stringify(data));
    }


    async readFile(fileName) {
        try {
            return await fs.promises.readFile(this.fileName, "utf-8");
        } catch (e) {
            return "[]";
        }
    }

    findPosition(id, array) {
        for (let i = 0; i < array.length; i++) {
            if (array[i].id == id) {
                return i;
            }
        }
        return -1;
    }
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const contenedor = new Contenedor("productos");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
  
server.on("error", (error) => console.log(`Error en servidor ${error}`));
  
app.get("/productos", (req, res) => {
    contenedor.getAll().then(productos => res.json(productos));
});

app.get("/productoRandom", (req, res) => {
    contenedor.getAll().then(productos => { 
        let randomNumber = getRandomInt(1, productos.length);
        for (let i = 0; i < productos.length; i++) {
            if (productos[i].id == randomNumber) {
                res.json(productos[i]);
            }
        }
    })
});

