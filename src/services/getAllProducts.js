import api from "./api";

const GetAllProducts = async () => {
  const result = await api.get(`/products`);
  return result.data;
};
export { GetAllProducts };