const express = require("express");
const moment = require("moment");
const { Router } = express;
const routerCart = Router();
const Container = require("../container.js");

const cartContainer = new Container("carts");
const prodContainer = new Container("productos");

routerCart.post('/', (req, res) => {
    const { body } = req;
    body.timestamp = moment().format('DD/MM/YYYY, h:mm:ss a');
    const idCarritoGenerado = cartContainer.save(body);
    res.json({ success: 'ok', new: idCarritoGenerado });   
});

routerCart.delete('/:id', async (req, res) => {
    let { id } = req.params;
    id = parseInt(id);
    try {
        let cart = await cartContainer.getById(id);
        if(cart == null) {
            res.json({message: 'El carrito no existe.'})  
            return;
        }
        const deletedCart = await cartContainer.deleteById(id);
        console.log("se ha eliminado el siguiente carrito: ", deletedCart);
        res.json(deletedCart);
    } catch(error) {
        res.json(error);
    }
});

routerCart.get("/:id/productos", async (req, res) => {
    let { id } = req.params;
    id = parseInt(id);
    try {
        let cart = await cartContainer.getById(id);
        res.json(cart.products);
    } catch(error) {
        res.json(error);
    }
});

routerCart.post("/:id/productos", async (req, res) => {
    const { body } = req;
    let { id } = req.params;
    id = parseInt(id);
    try {
        let cart = await cartContainer.getById(id);
        for(let i = 0; i < body.products.length; i++) {
            let product = await prodContainer.getById(body.products[i]);
            cart.products.push(product);
        }
        await cartContainer.updateById(id, cart);
        res.json(cart);
    } catch(error) {
        res.json(error);
    }
});

routerCart.delete('/:id/productos/:id_prod', async (req, res) => {
    let { id } = req.params;
    let { id_prod } = req.params;
    id = parseInt(id);
    let idProd = parseInt(id_prod);
    try {
        let cart = await cartContainer.getById(id);
        if(cart == null) {
            res.json({message: 'El carrito no existe.'})  
            return;
        }
        for(let i = 0; i < cart.products.length; i++) {
            if(cart.products[i].id == idProd) {
                cart.products.splice(i, 1);
            }
        }
        await cartContainer.updateById(id, cart);
        res.json(cart);
    } catch(error) {
        res.json(error);
    }
});


module.exports = routerCart;