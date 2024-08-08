import api from "./api";

const GetSingleProducts = async (productId) => {
  const result = await api.get(`/products/${productId}`);
  return result.data;
};
export { GetSingleProducts };