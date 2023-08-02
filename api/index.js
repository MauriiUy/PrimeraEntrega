const express = require('express');
const controller = require('./carts');
const products = require ('./products/products.js')

const app = express();
const port = 8080;


app.use(express.json());


app.use('/', controller);
//app.use('/', carts);

app.listen(port, () => {
  console.log(`Servidor iniciado en puerto ${port}`);
});




module.exports = app;