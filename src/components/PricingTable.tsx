import React from "react";
import Script from "next/script";

interface PricingTableProps {
  clientReferenceId: string;
  customerEmail: string;
}

const PricingTable = ({
  clientReferenceId,
  customerEmail,
}: PricingTableProps) => {
  return (
    <>
      <Script
        async
        strategy="lazyOnload"
        src="https://js.stripe.com/v3/pricing-table.js"
      />

      <stripe-pricing-table
        pricing-table-id="prctbl_1RWvQrRXh7aHEdyiS3jHyZgv"
        publishable-key="pk_test_51RWvIpRXh7aHEdyig1I1558v8lp1hsIzus6RT4NRBJRN2DeoQKiZ9H7gmDfhDaTduF17eAxZg7Q8yJUATwdQ9mLt00z3gz036j"
        client-reference-id={clientReferenceId}
        customer-email={customerEmail}
      />
    </>
  );
};

// If using TypeScript, add the following snippet to your file as well.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "stripe-pricing-table": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
export default PricingTable;
