// Y obtenga la siguiente información de dicho array
// A) Los nombres de los productos en un string separados por comas. (reduce + foreach + for)
// B) El precio total (reduce + for + foreach)
// C) El precio promedio (reduce + for + foreach)
// D) El producto con menor precio (for (aux))
// E) El producto con mayor precio (for (aux))
// F) Con los datos de los puntos A al E crear un objeto y representarlo por consola
// Const resultado = {a: 100, b: res2, c:  res3….}
// (Math.trunc)
// Aclaración: todos los valores monetarios serán expresados con 2 decimales

const productos = [
    { id:1, nombre:'Escuadra', precio:323.45 },
    { id:2, nombre:'Calculadora', precio:234.56 },
    { id:3, nombre:'Globo Terráqueo', precio:45.67 },
    { id:4, nombre:'Paleta Pintura', precio:456.78 },
    { id:5, nombre:'Reloj', precio:67.89 },
    { id:6, nombre:'Agenda', precio:78.90 }
  ]
  
  const nombres = (productos) => {
    let aux = "";
    let precioTotal = 0;
    let promedio;
    let menorPrecio = 99999;
    let mayorPrecio = -1;
  
    productos.forEach((element) => {
      aux+= ", " + element.nombre;
      precioTotal += element.precio;
      if(menorPrecio > element.precio) {
        menorPrecio = element.precio;
      }
  
      if(element.precio > mayorPrecio) {
        mayorPrecio = element.precio;
      }
    });
    promedio = precioTotal / productos.length;
  
    return {
      nombres: aux,
      precioTotal: parseFloat(precioTotal.toFixed(2)),
      menorPrecio:  parseFloat(menorPrecio.toFixed(2)),
      mayorPrecio : parseFloat(mayorPrecio.toFixed(2)),
      promedio: parseFloat(promedio.toFixed(2)),
    }
  }
  
  console.log(nombres(productos));