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

export interface PaginatedProducts {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderPayload {
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    street: string;
    city: string;
    state: string;
  };
  items: {
    product: string;
    name: string;
    price: number;
    image?: string;
    quantity: number;
  }[];
  totalPrice: number;
}

export interface OrderResponse {
  orderId: string;
  orderNumber: string;
  grandTotal: number;
  shippingFee: number;
  paymentReference: string;
}

export interface TrackedOrder {
  _id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    street: string;
    city: string;
    state: string;
  };
  items: {
    product: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
  }[];
  totalPrice: number;
  shippingFee: number;
  grandTotal: number;
  paymentStatus: "pending" | "paid" | "failed";
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
}
