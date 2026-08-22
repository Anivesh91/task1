const {ProductModel} = require('../models/productModel');


// create a new product
// POST /api/products


  const createProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;

    
    if (!name || price === undefined) {
      return res.status(400).json({
        message: "Name and price are required",
      });
    }

    const product = await ProductModel.create({
      name,
      price,
      description,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Error creating product",
      error: error.message,
    });
  }
};


// GET ALL PRODUCTS
// GET /api/products


const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching products",
      error: error.message,
    });
  }
};


// GET SINGLE PRODUCT
// GET /api/products/:id


const getProductById = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching product",
      error: error.message,
    });
  }
};


// UPDATE PRODUCT
// PUT /api/products/:id

const updateProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;

    const product = await ProductModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        price,
        description,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Error updating product",
      error: error.message,
    });
  }
};


// DELETE PRODUCT
// DELETE /api/products/:id


const deleteProduct = async (req, res) => {
  try{
    const product = await ProductModel.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
    });

  } 
  catch(error){
    res.status(500).json({
      message: "Error deleting product",
      error: error.message,
    });
  }
};





module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};  







