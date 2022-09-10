function script(knex) {
    knex.schema
    .createTable("product", (table) => {
        table.increments("id"),
        table.string("name"),
        table.integer("price"),
        table.string("thumbnail");
    })
    .then(() => {
        console.log("Tabla product creada");
    })
    .catch((err) => {
        console.log(err);
        throw new Error(err);
    })
    .finally(() => {
        knex.destroy();
    })

    knex.schema
    .createTable("chat", (table) => {
        table.increments("id"),
        table.string("email"),
        table.string("message"),
        table.string("date");
    })
    .then(() => {
        console.log("Tabla chat creada");
    })
    .catch((err) => {
        console.log(err);
        throw new Error(err);
    })
    .finally(() => {
        knex.destroy();
    })
}

module.exports = script;