import api from "../lib/axios";
import type { OrderPayload, OrderResponse, TrackedOrder } from "../types";

export const createOrder = async (
  payload: OrderPayload,
): Promise<OrderResponse> => {
  const { data } = await api.post("/orders", payload);
  return data.data;
};

export const verifyPayment = async (reference: string) => {
  const { data } = await api.get(`/orders/verify/${reference}`);
  return data.data;
};

export const trackOrder = async (
  orderNumber: string,
): Promise<TrackedOrder> => {
  const { data } = await api.get(`/orders/track/${orderNumber}`);
  return data.data;
};
