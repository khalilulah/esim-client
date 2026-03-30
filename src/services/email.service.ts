import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const CUSTOMER_TEMPLATE = import.meta.env.VITE_EMAILJS_CUSTOMER_TEMPLATE;
const ADMIN_TEMPLATE = import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE;
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

interface OrderEmailParams {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: string;
  subtotal: string;
  shippingFee: string;
  grandTotal: string;
  deliveryAddress: string;
}

export const sendOrderEmails = async (params: OrderEmailParams) => {
  const trackingUrl = `${window.location.origin}/track/${params.orderNumber}`;
  const adminUrl = "https://your-admin-url.vercel.app/orders";

  // Send to customer
  await emailjs.send(
    SERVICE_ID,
    CUSTOMER_TEMPLATE,
    {
      order_number: params.orderNumber,
      customer_name: params.customerName,
      items: params.items,
      subtotal: params.subtotal,
      shipping_fee: params.shippingFee,
      grand_total: params.grandTotal,
      delivery_address: params.deliveryAddress,
      tracking_url: trackingUrl,
      to_email: params.customerEmail,
    },
    PUBLIC_KEY,
  );

  // Send to admin
  await emailjs.send(
    SERVICE_ID,
    ADMIN_TEMPLATE,
    {
      order_number: params.orderNumber,
      customer_name: params.customerName,
      customer_email: params.customerEmail,
      customer_phone: params.customerPhone,
      items: params.items,
      grand_total: params.grandTotal,
      delivery_address: params.deliveryAddress,
      admin_url: adminUrl,
      to_email: ADMIN_EMAIL,
    },
    PUBLIC_KEY,
  );
};
