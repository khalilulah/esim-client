import React from "react";
import PageLayout from "../components/PageLayout";

function Shipping() {
  return (
    <PageLayout title="Shipping">
      <div>
        <h2 className="font-League uppercase text-2xl text-neutral-900 mb-3">
          Processing Time
        </h2>
        <p>
          All orders are processed within 1–2 business days. Orders placed on
          weekends or public holidays are processed the next business day. You
          will receive a confirmation message once your order has been
          dispatched.
        </p>
      </div>

      <div>
        <h2 className="font-League uppercase text-2xl text-neutral-900 mb-3">
          Delivery Within Nigeria
        </h2>
        <p>
          We ship to all states in Nigeria. Delivery typically takes 2–5
          business days depending on your location. Lagos deliveries are usually
          faster, within 1–3 business days.
        </p>
      </div>

      <div>
        <h2 className="font-League uppercase text-2xl text-neutral-900 mb-3">
          Shipping Fees
        </h2>
        <p>
          Shipping fees are calculated at checkout based on your delivery
          location. We offer free shipping on orders above a certain amount —
          this will be shown clearly at checkout.
        </p>
      </div>

      <div>
        <h2 className="font-League uppercase text-2xl text-neutral-900 mb-3">
          Order Tracking
        </h2>
        <p>
          Once your order is shipped, you will receive a tracking link via the
          contact details provided at checkout. You can also track your order
          using your order ID on our order tracking page.
        </p>
      </div>
    </PageLayout>
  );
}

export default Shipping;
