const Product = require("../models/product");
const Order = require("../models/Order");
const User = require("../models/User");
const CustomOrder = require("../models/customOrder");

const getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalCustomers = await User.countDocuments({ role: "customer" });
    const totalCustomOrders = await CustomOrder.countDocuments();

    const paidOrders = await Order.find({ paymentStatus: "Paid" });

    const revenue = paidOrders.reduce((sum, order) => {
      return sum + order.total;
    }, 0);

    const pendingOrders = await Order.countDocuments({
      orderStatus: "Processing",
    });

    const pendingCustomOrders = await CustomOrder.countDocuments({
      status: "Pending",
    });

    res.json({
      totalProducts,
      totalOrders,
      totalCustomers,
      totalCustomOrders,
      revenue,
      pendingOrders,
      pendingCustomOrders,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to load dashboard stats",
    });
  }
};

module.exports = {
  getDashboardStats,
};