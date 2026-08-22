const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const {ProductModel} = require('./models/productModel');

const productRoutes = require('./routes/productRoutes');


app.use('/api/products', productRoutes);

module.exports = app;