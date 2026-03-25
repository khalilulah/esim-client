import React from "react";
import PageLayout from "../components/PageLayout";

const WHATSAPP = "2348012345678";

function Returns() {
  return (
    <PageLayout title="Returns">
      <div>
        <h2 className="font-League uppercase text-2xl text-neutral-900 mb-3">
          Our Policy
        </h2>
        <p>
          Due to the nature of our products — personal care and fragrance — we
          do not accept returns or exchanges on opened or used items. We take
          great care in packaging every order, but if your item arrives damaged
          or incorrect, we will make it right.
        </p>
      </div>

      <div>
        <h2 className="font-League uppercase text-2xl text-neutral-900 mb-3">
          Damaged or Wrong Items
        </h2>
        <p>
          If you receive a damaged or incorrect product, please contact us
          within 48 hours of delivery with your order ID and a photo of the
          item. We will arrange a replacement or refund promptly.
        </p>
      </div>

      <div>
        <h2 className="font-League uppercase text-2xl text-neutral-900 mb-3">
          Refunds
        </h2>
        <p>
          Approved refunds are processed within 3–5 business days back to your
          original payment method. If you paid via bank transfer, refunds will
          be made directly to your account.
        </p>
      </div>

      <div>
        <h2 className="font-League uppercase text-2xl text-neutral-900 mb-3">
          Contact Us
        </h2>
        <p>
          For any issues with your order, reach us directly on{" "}
          <a
            href={`https://wa.me/${WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-900 underline underline-offset-4 hover:text-neutral-500 transition-colors"
          >
            WhatsApp
          </a>{" "}
          and we will respond as quickly as possible.
        </p>
      </div>
    </PageLayout>
  );
}

export default Returns;
