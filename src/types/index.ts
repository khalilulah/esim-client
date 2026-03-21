export type ProductCategory = string;

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  images: string[];

  // these might not be filled yet
  description?: string;
  ingredients?: string[];
  howToUse?: string;
}
