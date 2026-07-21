const express = require("express");
const imageSliderController = require("./image-slider.controller");

const router = express.Router();

router.get("/", imageSliderController.getSlides);

module.exports = router;
