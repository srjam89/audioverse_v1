import api from "./api";

async function getCategories(config = {}) {
  const response = await api.get("/categories", config);
  return response.data.categories;
}

export { getCategories };
