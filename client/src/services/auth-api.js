import api from "./api";

async function registerUser(payload) {
  const response = await api.post("/auth/register", payload);
  return response.data;
}

export { registerUser };
