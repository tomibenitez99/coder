const express = require("express");
const moment = require("moment");
const { Router } = express;
const routerCart = Router();
const CartDao = require('../DAOs/cartDao.js')


const Cart = new CartDao()

routerCart.post('/', async function(req, res){
    try {
        const cart = await Cart.newCart()
        res.status(200).send({
            status: 200,
            data: {
                cart,
            },
            message: 'cart added'
        })
    } catch(error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
});

routerCart.delete('/:id', async function(req, res){
    const num = req.params.id
    try {
        const deleted = await Cart.deleteCartById(num)
        res.status(200).send({
            status: 200,
            data: {
                deleted,
            },
            message: 'cart deleted'
        })
    } catch(error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
});

routerCart.post('/productos', async function(req, res){
    try{
        let idCart = req.body.idCart
        let idProd = req.body.idProd
        const productAdded = await Cart.addProduct(idCart, idProd)
        res.status(200).send({
            status: 200,
            data: {
                productAdded,
            },
            message: 'product added to cart'
        })
    } catch(error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
});

routerCart.delete('/eliminarProducto/:id', async function(req, res){
    const idCart = req.params.idCart
    try {
        let idCart = req.body.idCart
        let idProd = req.body.idProd
        let idInCart = idCart
        const deletedProduct = await Cart.deleteProductFromCart(idCart, idProd, idInCart)
        res.status(200).send({
            status: 200,
            data: {
                deletedProduct,
            },
            message: 'product deleted from cart'
        })
    } catch(error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
})

module.exports = routerCart;