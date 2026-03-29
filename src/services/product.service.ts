import api from "../lib/axios";
import type { Product, PaginatedProducts } from "../types";

export const getProducts = async (params?: {
  page?: number;
  limit?: number;
  category?: string;
}): Promise<PaginatedProducts> => {
  const { data } = await api.get("/products", { params });
  return data.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const { data } = await api.get(`/products/${id}`);
  return data.data;
};
