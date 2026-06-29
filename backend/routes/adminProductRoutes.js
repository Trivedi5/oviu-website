const express = require("express");
const router = express.Router();

const { addProduct } = require("../controllers/adminProductController");
const upload = require("../middleware/uploadMiddleware");

router.post("/", upload.single("image"), addProduct);

module.exports = router;