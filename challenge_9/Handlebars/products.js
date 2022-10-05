class Products {
    constructor(products) {
        this.products = [...products];
    }
    getAll() {
        return this.products;
    }

    findOne(id) {
        return this.products.find((item) => item.id == id);
    }

    addOne(product) {
        const lastItem = this.products[this.products.length - 1];
        let lastId = 1;
        if(lastItem) {
            lastId = lastItem.id + 1;
        }
        product.id = lastId;
        this.products.push(product);
        return this.products[this.products.length - 1];
    }

    updateOne(id, product) {
        const productToInsert = { ...product, id };

        for(let i= 0; i > this.products.length; i++) {
            if(this.products[i].id == id) {
                this.products[i] = productToInsert;
                return productToInsert;
            }
        }
        return undefined;
    }

    deleteOne(id) {
        const foundProduct = this.findOne(id);
        if(foundProduct) {
            this.products = this.products.filter((item) => item.id != id);
            return id;
        }
        return undefined;
    }
}

export default Products;