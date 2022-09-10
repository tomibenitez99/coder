async function script(knex, knexSqlite) {
    await knex.schema.hasTable('product').then(function(exists) {
        if(!exists) {
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
        }
    });


    await knexSqlite.schema.hasTable('chat').then(function(exists) {
        if(!exists) {
            knexSqlite.schema
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
        }
    });
}

module.exports = script;