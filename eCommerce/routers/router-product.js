const express = require("express");
const moment = require("moment");
const { Router } = express;
const routerProduct = Router();
const ProductDao = require("../DAOs/productDao.js")
const Container = require("../container.js");
const IS_ADMIN = true;

const container = new Container("productos");

routerProduct.get("/", async (req, res) => {
    const prodDao = new ProductDao()
    try {
        const products = await prodDao.getAll()
        res.status(200).send({
            status: 200,
            data: {
                products,
            },
            message: 'found products'
        })
    } catch(error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
});


routerProduct.get('/:id', async (req, res) => {
    const prodDao = new ProductDao()
    const num = req.params.id
    try {
        const product = await prodDao.getById(num)
        res.status(200).send({
            status: 200,
            data: {
                product,
            },
            message: 'found product'
        })
    } catch(error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
});

routerProduct.post('/', function(req, res, next){
    if(IS_ADMIN) {
        console.log('Admin connected')
        next()
    } else {
        res.json({error: -1, descripcion: 'ruta ./api/productos no autorizado' });
    }
}, async (req, res) => {
    try {
        const prodDao = new ProductDao()
        const id = await prodDao.save(req.body)
        res.status(200).send({
            status: 200,
            data: {
                id,
            },
            message: 'added product'
        })
    } catch(error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
});

  
routerProduct.put('/:id', function(req, res, next){
    if(IS_ADMIN) {
        console.log('Admin connected')
        next()
    } else {
        res.json({error: -1, descripcion: 'ruta ./api/productos/:id no autorizado' });
    }
}, async (req, res) => {
    const num = req.params.id
    try {
        const prodDao = new ProductDao()
        const product = req.body
        const result = await prodDao.changeById(num, product)
        res.status(200).send({
            status: 200,
            data: {
                result,
            },
            message: 'updated product'
        })
    } catch(error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
});

routerProduct.delete('/:id', function(req, res, next){
    if(IS_ADMIN) {
        console.log('Admin connected')
        next()
    } else {
        res.json({error: -1, descripcion: 'ruta ./api/productos/:id no autorizado' });
    }
}, async (req, res) => {
    const num = req.params.id
    try {
        const prodDao = new ProductDao()
        const deleted = await prodDao.deleteById(num)
        res.status(200).send({
            status: 200,
            data: {
                deleted,
            },
            message: 'deleted product'
        })
    } catch(error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
});

module.exports = routerProduct;