import api from "./api";

async function getImageSlides(config = {}) {
  const response = await api.get("/image-slider", config);
  return response.data.slides;
}

export { getImageSlides };
