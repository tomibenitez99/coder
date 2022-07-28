const fs = require('fs');

class Contenedor{
    constructor(fileName) {
        this.fileName = "./archivos/"+fileName+".json"
    }


    async save(data) {
        try {
            let contenidoEnJson = JSON.parse(await this.readFile(this.fileName, "utf-8"));
            data.id = contenidoEnJson.length + 1;
            contenidoEnJson.push(data);
            console.log("se ha insertado el id: " + data.id);
            this.simpleSave(contenidoEnJson);
        return data.id;
        } catch(error) {
            console.log(error)
        }
    }


    async getById(id) {
        let array = await this.getAll();
        for(let i = 0; i < array.length; i++) {
            if(array[i].id == id) {
                return array[i];
            }
        }
        return null;
    }


    async getAll() {
        try {
            let data = await this.readFile(this.fileName);
            return JSON.parse(data);
        } catch(error) {
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
        for(let i = 0; i < array.length; i++) {
            if (array[i].id == id) {
                return i;
            }
        }
        return -1;
    }

    async start(data) {
        await this.save(data);
        await this.getById(1).then(producto => console.log(producto));
        await this.getAll().then(productos => console.log(productos));
    }
}    

const contenedor = new Contenedor("archivo");
let regla = {
    "id": null,
    "Price": 30,
    "thumbnail": "https://thumbs.dreamstime.com/b/una-regla-de-madera-121917260.jpg"
};

contenedor.start(regla);

/* then(console.log(tomi.getById(1))); */
// tomi.deleteById(1);