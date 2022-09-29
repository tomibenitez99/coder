const productos = [
    {id: 100, name: 'banana', stock: 3},
    {id: 101, name: 'manzana', stock: 3},
    {id: 102, name: 'naranja', stock: 3},
    {id: 103, name: 'kiwi', stock: 3}
]

const findIndex = productos.findIndex((item) => (item.id == 102));

productos[findIndex].id = 102;
console.log(productos);