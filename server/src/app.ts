import express from 'express';
import ProductManager from './ProductManager.js';
import CartSerive from './CartService.js';

const productManager = new ProductManager();
const products = productManager.getProducts();

const cartService = new CartSerive(products);

const app = express();
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

export default app;
