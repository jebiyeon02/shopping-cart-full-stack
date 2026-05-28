import express from 'express';
import ProductManager from './ProductManager.js';
import Cart from './Cart.js';
import AppService from './AppService.js';

const productManager = new ProductManager();
const cart = new Cart();

const appService = new AppService(productManager, cart);

const app = express();
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

export default app;
