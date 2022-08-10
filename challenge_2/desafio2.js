const fs = require('fs');
const { get } = require('http');

class Contenedor {
    constructor(fileName) {
        this.fileName = "./archivos/" + fileName + ".json";
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

class Executor {
    constructor(contenedor) {
        this.contenedor = contenedor;
    }

    async start(data) {
        await this.contenedor.save(data).then(
            () => { 
                this.contenedor.getAll().then(
                    productos => console.log(productos)
                ); 
            }
        ).then(
            () => { this.contenedor.getById(1).then((e) => {console.log(e)}) }
        );
    }
}

let regla = {
    "id": null,
    "Price": 50,
    "thumbnail": "https://thumbs.dreamstime.com/b/una-regla-de-madera-121917260.jpg"
};

let goma = {
    "id": null,
    "Price": 30,
    "thumbnail": "https://image.shutterstock.com/image-photo/rubber-eraser-pencil-ink-pen-260nw-656520052.jpg"
}

const contenedor = new  Contenedor("archivo1");
const executor = new Executor(contenedor);

let res = executor.start(regla);

/* executor.start(regla).then(() => { executor.start(goma) }); */

/* contenedor.getAll().then(productos => console.log(productos)); */