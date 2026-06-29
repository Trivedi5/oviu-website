const express = require("express");
const router = express.Router();

const customUpload = require("../middleware/customUpload");

const {
  createCustomOrder,
  getCustomOrders,
} = require("../controllers/customOrderController");

router.post(
  "/",
 customUpload.fields([
    { name: "logoFile", maxCount: 1 },
    { name: "artworkFile", maxCount: 1 },
    { name: "referenceFile", maxCount: 1 },
]),
  createCustomOrder
);

router.get("/", getCustomOrders);

module.exports = router;