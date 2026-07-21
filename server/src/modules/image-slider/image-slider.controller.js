const imageSliderRepository = require("./image-slider.repository");

async function getSlides(req, res, next) {
  try {
    const slides = await imageSliderRepository.findAll();
    res.json({ slides });
  } catch (error) {
    next(error);
  }
}

module.exports = { getSlides };
