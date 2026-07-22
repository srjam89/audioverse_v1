const categoryRepository = require("./category.repository");

async function getCategories(req, res, next) {
  try {
    const categories = await categoryRepository.findAll();
    res.json({ categories });
  } catch (error) {
    next(error);
  }
}

module.exports = { getCategories };
