app.post('/products', (req, res) => {
    //VER QUE PRODUCTO NUEVO ME ENVIO
    //CREAR BASE DE DATOS
    const respuesta = {
      success: 'ok',
      newProduct: {
        id: 103,
        name: 'adids shoes 2',
        price: 400,
      },
    };
    res.json(respuesta);
  });
  
  let productos = [
    { id: 100, name: 'nike ball', price: 100 },
    { id: 101, name: 'nike shoes', price: 200 },
    { id: 102, name: 'adids shoes', price: 300 },
  ];
  