const express = require("express");
const moment = require("moment");
const { Router } = express;
const routerProduct = Router();
const Container = require("../container.js");
const IS_ADMIN = true;

const container = new Container("productos");

routerProduct.get("/", (req, res) => {
    container.getAll().then(productos => res.json(productos));
});


routerProduct.get('/:id', async (req, res) => {
    let { id } = req.params;
    id = parseInt(id);
    try {
        const product = await container.getById(id);
        if(product != null) {
            res.json(product);
        } else {
            res.json({message: 'El producto no existe.'})
        }
    } catch(error) {
        res.json(error);
    }
});

routerProduct.post('/', (req, res) => {
    if(IS_ADMIN) {
        const { body } = req;
        body.timestamp = moment().format('DD/MM/YYYY, h:mm:ss a');
        const idProductoGenerado = container.save(body);
        res.json({ success: 'ok', new: idProductoGenerado });
    } else {
        res.json({error: -1, descripcion: 'ruta ./api/productos no autorizado' });
    }
});

  
routerProduct.put('/:id', async (req, res) => {
    if(IS_ADMIN) {
        let { id } = req.params;
        const { body } = req;
        id = parseInt(id);
        try {
            let product = await container.getById(id);
            if(product == null) {
                res.json({message: 'El producto no existe.'})  
            }
            body.timestamp = product.timestamp;
            const changedIdProduct = await container.updateById(id, body);
            res.json(changedIdProduct);
        } catch(error) {
            res.json(error);
        }
    } else {
        res.json({error: -1, descripcion: 'ruta ./api/productos no autorizado' });
    }
});

routerProduct.delete('/:id', async (req, res) => {
    if(IS_ADMIN) {
        let { id } = req.params;
        id = parseInt(id);
        try {
            let product = await container.getById(id);
            if(product == null) {
                res.json({message: 'El producto no existe.'})  
                return;
            }
            const deletedProduct = await container.deleteById(id);
            console.log("se ha eliminado el siguiente producto: ", deletedProduct);
            res.json(deletedProduct);
        } catch(error) {
            res.json(error);
        }
    } else {
        res.json({error: -1, descripcion: 'ruta ./api/productos no autorizado' });
    }
});

module.exports = routerProduct;