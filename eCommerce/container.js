const fs = require('fs');

class Container {
    constructor(fileName) {
        this.fileName = "./archivos/" + fileName + ".txt";
    }

    async save(data) {
        try {
            this.createFile(this.fileName);
            let contenidoEnJson = JSON.parse(await this.readFile(this.fileName, "utf-8"));
            if (contenidoEnJson.length === 0) { 
                data.id = contenidoEnJson.length + 1; 
            } else {
                data.id = contenidoEnJson[contenidoEnJson.length - 1].id + 1;
            }
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
                console.log(array);
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
        let product = this.getById(id);
        let array = await this.getAll();
        let position = this.findPosition(id, array);
        array.splice(position, 1);
        await this.simpleSave(array);
        return product;
    }


    async deleteAll() {
        await this.simpleSave([]);
    }

    async updateById(id, data) {
        let array = await this.getAll();
        for (let i = 0; i < array.length; i++) {
            if (array[i].id == id) {
                data.id = id;
                array[i] = data;
            }
        } 
        await this.simpleSave(array);
        return data.id;
    }

    //FUNCIONES AUXILIARES:
    async simpleSave(data) {
        await fs.promises.writeFile(this.fileName, JSON.stringify(data, null, 2));
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

    createFile(filename) {
        fs.open(filename,'r',function(err, fd){
          if (err) {
            fs.writeFileSync(filename, '[]', function(err) {
                if(err) {
                    console.log(err);
                }
                console.log("The file was saved!");
            });
          } else {
            console.log("The file exists!");
          }
        });
      }
}

module.exports = Container;