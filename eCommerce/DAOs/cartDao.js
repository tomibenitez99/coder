var admin = require("firebase-admin");
var serviceAccount = require("./db/ecommerce-d2676-firebase-adminsdk-rdf31-b1e562569e.json");
const ProductDao = require('./productDao.js')

const Products = new ProductDao()

class CartDao {
    constructor() {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://ecommerce-d2676-default-rtdb.firebaseio.com"
          });
    }

    async newCart() {
        const db = admin.firestore()
        const query = db.collection('carts')
        let time = new Date()
        try {
            const doc = query.doc()
            const cart = await doc.create({
                timestamp: time.toString(),
                products: []
            })
            return cart
        } catch(error) {
            throw Error(error.message)
        }
    }

    async getCartById(id) {
        try {
            const db = admin.firestore()
            const query = db.collection('carts')
            const doc = query.doc(String(id))
            const found = await doc.get()
            return found.data()
        } catch(error) {
            throw Error(error.message)
        }
    }

    async deleteCartById(id) {
        try {
            const db = admin.firestore()
            const query = db.collection('carts')
            const doc = query.doc(String(id))
            const found = await doc.delete()
        } catch(error) {
            throw Error(error.message)
        }
    }

    async deleteProductFromCart(idCart, idProd, idInCart) {
        try {
            function random(min, max) {
                return Math.floor((Math.random() * (max - min + 1)) + min);
            }

            let productRandom = await ProductDao.getById(idProd);

            const db = admin.firestore()
            const query = db.collection('carts')
            const doc = query.doc(idCart)

            productRandom.id = idInCart;

            const item = await doc.update({
                products: admin.firestore.FieldValue.arrayRemove(String(productRandom))
            })
        } catch(error) {
            throw Error(error.message)
        }
    }

    async addProduct(idCart, idProd) {
        try {
            function random(min, max) {
                return Math.floor((Math.random() * (max - min + 1)) + min);
            }

            let productRandom = await ProductDao.getById(idProd);

            const db = admin.firestore()
            const query = db.collection('carts')
            const doc = query.doc(idCart)

            let idRandom = random(1,10000)

            productRandom.id = String(idRandom)

            const item = await doc.update({
                products: admin.firestore.FieldValue.arrayRemove(String(productRandom))
            })
        } catch(error) {
            throw Error(error.message)
        }
    } 
}

module.exports = CartDao;