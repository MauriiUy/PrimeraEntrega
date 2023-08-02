const { Router } = require('express');
const router = Router();
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, 'products.json');

router.get('/carts', (req, res) => {
  try {
    const productsData = fs.readFileSync(productsFilePath, 'utf-8');
    const products = JSON.parse(productsData);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la lista de productos' });
  }
});

router.post('/carts', (req, res) => {
  try {
    const newProducts = req.body; 

    const productsData = fs.readFileSync(productsFilePath, 'utf-8');
    const products = JSON.parse(productsData);

    newProducts.forEach(newProduct => {
      newProduct.id = generateProductId();
      products.push(newProduct);
    });

    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

    
    const addedProductsInfo = newProducts.map(product => {
      return { id: product.id, stock: product.stock };
    });

    res.json({ message: 'Productos agregados', addedProducts: addedProductsInfo });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar los productos' });
  }
});

router.put('/products/:id', (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const { stock } = req.body;

    const productsData = fs.readFileSync(productsFilePath, 'utf-8');
    const products = JSON.parse(productsData);

    const product = products.find(product => product.id === productId);

    if (product) {
      product.stock = stock;

      fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

      res.json({ message: `Producto con ID ${productId} actualizado con nuevo stock: ${stock}` });
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
});

router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;

    const productsData = fs.readFileSync(productsFilePath, 'utf-8');
    const products = JSON.parse(productsData);

    const productIndex = products.findIndex(product => product.id === id);

    if (productIndex !== -1) {
      products.splice(productIndex, 1);
      fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
      res.json({ message: 'Producto eliminado', products });
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
});

function generateProductId() {
  const productsData = fs.readFileSync(productsFilePath, 'utf-8');
  const products = JSON.parse(productsData);
  const lastProduct = products[products.length - 1];
  const lastId = lastProduct ? lastProduct.id : 0;
  return lastId + 1;
}

module.exports = router;