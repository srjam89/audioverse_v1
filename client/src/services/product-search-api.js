import api from "./api";

async function searchProducts(query, config = {}) {
  const response = await api.get("/products/search", {
    ...config,
    params: {
      q: query,
      ...(config.params || {}),
    },
  });

  return response.data.products;
}

export { searchProducts };
