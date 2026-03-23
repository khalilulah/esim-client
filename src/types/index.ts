export type ProductCategory = string;

export interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  images: string[];
  description?: string;
  ingredients?: string[];
  howToUse?: string;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}
