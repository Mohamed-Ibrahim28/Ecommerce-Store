import api from "./api";

const GetAllCategories = async () => {
  const result = await api.get(`/products/categories`);
  return result.data;
};
export { GetAllCategories };
