const productSearchRepository = require("./product-search.repository");

async function searchProducts(req, res, next) {
  try {
    const query = typeof req.query.q === "string" ? req.query.q.trim() : "";

    if (query.length < 2) {
      return res.json({ products: [] });
    }

    if (query.length > 100) {
      return res.status(400).json({
        message: "Search query must be 100 characters or fewer",
      });
    }

    const products = await productSearchRepository.searchByName(query);
    return res.json({ products });
  } catch (error) {
    return next(error);
  }
}

module.exports = { searchProducts };
