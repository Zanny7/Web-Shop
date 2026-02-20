import { Product } from "./product";

export interface ProductsResponse {
  products: Product[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}