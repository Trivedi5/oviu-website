const CustomOrder = require("../models/CustomOrder");

const createCustomOrder = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      productType,
      quantity,
      color,
      notes,
    } = req.body;

    const logoFile = req.files?.logoFile
      ? req.files.logoFile[0].filename
      : "";

    const artworkFile = req.files?.artworkFile
      ? req.files.artworkFile[0].filename
      : "";

    const referenceFile = req.files?.referenceFile
      ? req.files.referenceFile[0].filename
      : "";

    const order = await CustomOrder.create({
      customer: {
        name,
        email,
        phone,
      },
      productType,
      quantity,
      color,
      notes,
      logoFile,
      artworkFile,
      referenceFile,
    });

    res.status(201).json(order);
  } catch (error) {
    console.log("CUSTOM ORDER ERROR:", error.message);

    res.status(500).json({
      message: "Failed to create custom order",
    });
  }
};

const getCustomOrders = async (req, res) => {
  try {
    const orders = await CustomOrder.find().sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch custom orders",
    });
  }
};

module.exports = {
  createCustomOrder,
  getCustomOrders,
};