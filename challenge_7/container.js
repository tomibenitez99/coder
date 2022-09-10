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
            .finally(() => this.db.destroy());
        } catch (error) {
            console.log(error)
        }
    }

    async getAll() {
        this.db
        .from(this.tableName)
        .select("*")
        .then((res) => {
            res = res.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                thumbnail: item.thumbnail
            }));
            res.forEach((item) => console.log(item));
        })
        .catch((e) => console.log(e))
        .finally(() => this.db.destroy());
    }

    async getById(id) {}
    async deleteById(id) {}
    async deleteAll() {}
    async updateById(id, data) {}
}

module.exports = Container;