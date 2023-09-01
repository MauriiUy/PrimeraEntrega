const express = require('express');
const controller = require('./dao/fileSystem/carts');
const products = require ('./products/products.js')
const cartsRouter = require('./dao/fileSystem/carts');



const app = express();
const port = 8080;


app.use(express.json());


//app.use('/', controller);
app.use('/', cartsRouter);

app.listen(port, () => {
  console.log(`Servidor iniciado en puerto ${port}`);
});




module.exports = app;