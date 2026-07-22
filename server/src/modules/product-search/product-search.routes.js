const express = require("express");
const productSearchController = require("./product-search.controller");

const router = express.Router();

router.get("/search", productSearchController.searchProducts);

module.exports = router;
