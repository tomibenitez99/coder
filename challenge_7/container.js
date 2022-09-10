class Container {
    constructor(tableName, db) {
        this.tableName = tableName;
        this.db = db;
    }

    async save(data) {
        try {
            this.db(this.tableName)
            .insert(data)
            .then((res) => console.log("saved", res))
            .catch((e) => console.log(e))
        } catch (error) {
            console.log(error)
        }
    }

    async getAll() {
        return this.db
        .from(this.tableName)
        .select("*");
    }

    async getById(id) {}
    async deleteById(id) {}
    async deleteAll() {}
    async updateById(id, data) {}
}

module.exports = Container;