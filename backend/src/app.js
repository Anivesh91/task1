const express = require('express');
const app = express();
const cors = require('cors');
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const {ProductModel} = require('./models/productModel');

const productRoutes = require('./routes/productRoutes');


app.use('/api/products', productRoutes);

module.exports = app;