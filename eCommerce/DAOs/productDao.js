const mongoose = require('mongoose');
const productSchema = require('../schema/productSchema');

class ProductDao {
    async connectMDB() {
        try {
            const URL = "mongodb+srv://tomibenitez99:Dooudh-dhooudh99@cluster0.ekk9mhs.mongodb.net/?retryWrites=true&w=majority"
            let rta = await mongoose.connect(URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
        } catch (e) {
            console.log(e)
        }
    }

    async save(product) {
        try {
            let time = new Date()
            await this.connectMDB()
            product.time = time.toString()
            await productSchema.create(product)
            const id = product.id
            mongoose.disconnect()
            return id
        } catch(error) {
            throw Error(error.message)
        }
    }

    async getAll() {
        try {
            await this.connectMDB()
            const prod = await productSchema.find({})
            mongoose.disconnect()
            return prod
        } catch(error) {
            throw Error(error.message)
        }
    }

    async getById(id) {
        try {
            await this.connectMDB()
            const prodDao = await productSchema.findById(id)
            mongoose.disconnect()
            return prodDao
        } catch(error) {
            throw Error(error.message)
        }
    }

    async changeById(id, change) {
        try {
            await this.connectMDB()
            const nuevo = await productSchema.updateOne({_id: id}, {$set: change})
            mongoose.disconnect()
            return nuevo
        } catch(error) {
            throw Error(error.message)
        }
    }

    async deleteById(id) {
        try {
            await this.connectMDB()
            const deleted = await productSchema.deleteOne({_id: id})
            mongoose.disconnect()
            return deleted
        } catch(error) {
            throw Error(error.message)
        } 
    }
}

module.exports = ProductDao;