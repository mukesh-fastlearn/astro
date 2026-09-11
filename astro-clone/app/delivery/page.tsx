"use client";

import LegalPage, { Section, Bullets, B } from "@/components/LegalPage";
import { BUSINESS } from "@/lib/legal";

export default function DeliveryPage() {
  return (
    <LegalPage title="Delivery Policy" subtitle="How and when what you buy reaches you.">
      <Section heading="1. Digital service — nothing is shipped">
        <p>
          {BUSINESS.tradingName} sells a <strong>digital service</strong>. There is no physical
          product, no courier, no shipping address and no delivery charge. This page exists because
          payment providers require a stated delivery policy; the honest version is that nothing is
          posted to you.
        </p>
      </Section>

      <Section heading="2. When credits arrive">
        <p>
          Credits are added to your wallet <strong>immediately</strong> on successful payment —
          typically within a few seconds. You can see the new balance and the matching ledger entry
          on your dashboard straight away.
        </p>
        <p>
          If a payment succeeded but your balance has not changed within 30 minutes, email{" "}
          <B field="email" /> with the payment reference. Do not pay again.
        </p>
      </Section>

      <Section heading="3. When readings are delivered">
        <Bullets
          items={[
            <span key="1"><strong>Kundli and calculators</strong> — generated instantly in your browser. Nothing is queued.</span>,
            <span key="2"><strong>AI astrologer</strong> — replies typically within 5 to 30 seconds.</span>,
            <span key="3"><strong>Human astrologer</strong> — depends on the astrologer. They are people and reply when available, usually within support hours. No response time is guaranteed.</span>,
          ]}
        />
      </Section>

      <Section heading="4. Getting a copy">
        <p>
          Your kundli can be downloaded at any time from the chart page as a PDF, a plain-text
          report, or raw JSON. Consultation transcripts remain on your account for as long as it
          exists.
        </p>
      </Section>

      <Section heading="5. If delivery fails">
        <p>
          If credits are deducted and no reply is produced because of a fault on our side, the
          credits are returned to your wallet automatically. If that does not happen, contact us and
          we will correct it.
        </p>
      </Section>

      <Section heading="6. Contact">
        <p>
          <B field="email" /> · <B field="phone" /> · {BUSINESS.supportHours}
        </p>
      </Section>
    </LegalPage>
  );
}
