const mongoose = require("mongoose");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const Product = require("./models/product");

dotenv.config();

connectDB();

const products = [
  {
    name: "Anime T-Shirt",
    category: "T-Shirts",
    description:
      "Premium cotton anime t-shirt with high-quality custom printing.",
    price: 30,
    stock: 35,
    image: "tshirt.jpg",
    featured: true,
  },
  {
    name: "Rex Hoodie",
    category: "Hoodies",
    description:
      "Comfortable heavyweight hoodie with premium embroidery and printing.",
    price: 65,
    stock: 18,
    image: "hoodie.jpg",
    featured: true,
  },
  {
    name: "Custom Phone Cover",
    category: "Accessories",
    description:
      "Personalized phone cover with your own artwork or company logo.",
    price: 20,
    stock: 42,
    image: "phone-cover.jpg",
    featured: true,
  },
  {
    name: "Luxury Gift Box",
    category: "Gift Boxes",
    description:
      "Luxury customized gift box for corporate and personal occasions.",
    price: 75,
    stock: 12,
    image: "box.jpg",
    featured: true,
  }
];

const importData = async () => {
  try {

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("Products Imported Successfully");

    process.exit();

  } catch (error) {

    console.log(error);

    process.exit(1);

  }
};

importData();