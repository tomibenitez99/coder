import { faker } from "@faker-js/faker";
faker.locale = "es";

class ProductFaker {
  constructor() {}
  createId() {
    }
    
    createProducts(amount) {
      let products = [];
      for (let i = 0; i < amount; i++) {
        products.push({
          title: faker.animal.fish(),
          price: faker.commerce.price(1000, 2000, 0, "$"),
          thumbnail: faker.image.avatar(),
        });
      }
      return products;
    }
}

export default ProductFaker;