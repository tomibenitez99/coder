const { options } = require("./options/optionsMDB.js")
const knex = require("knex")(options);

class Container {
    constructor() {
        
    }

    async save(data) {
        try {
            
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

        } catch (error) {
            console.log(error);
        }
    }


    async deleteById(id) {

    }


    async deleteAll() {

    }

    async updateById(id, data) {

    }

    async createSchema() {
        knex.schema
            .createTable("products", (table) => {
                table.increments("id"), table.string("name"), table.integer("price")
            })
    }
}

module.exports = Container;