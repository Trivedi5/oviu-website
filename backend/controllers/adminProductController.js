const Product = require("../models/product");

const addProduct = async (req, res) => {
  try {
    const { name, category, description, price, stock, featured } = req.body;

    const image = req.file ? req.file.filename : "";

    const product = await Product.create({
      name,
      category,
      description,
      price,
      stock,
      featured: featured === "true",
      image,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to add product" });
  }
};

module.exports = { addProduct };