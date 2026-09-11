"use client";

import LegalPage, { Section, Bullets, B } from "@/components/LegalPage";
import { BUSINESS, COST_PER_MESSAGE } from "@/lib/legal";

export default function RefundPage() {
  return (
    <LegalPage
      title="Refund and Cancellation Policy"
      subtitle="When you can get your money back, and how to ask."
    >
      <Section heading="1. What you are buying">
        <p>
          You buy <strong>credits</strong>. Credits are spent on messages to the AI astrologer and
          to human astrologers, at {COST_PER_MESSAGE} credits per message. Credits are digital goods
          delivered to your wallet immediately on payment.
        </p>
      </Section>

      <Section heading="2. Refund of unused credits">
        <p>
          <strong>Unused purchased credits are refundable within 7 days of purchase.</strong> We
          refund the unused portion, calculated at the rate you paid.
        </p>
        <Bullets
          items={[
            "Credits already spent on a delivered reply are not refundable — the service was provided.",
            "Free sign-up credits have no cash value and are never refundable.",
            "Promotional or bonus credits are not refundable.",
          ]}
        />
      </Section>

      <Section heading="3. Full refunds — when we refund without question">
        <Bullets
          items={[
            "You were charged but received no reply, and our automatic refund did not return the credits.",
            "You were charged more than once for the same purchase.",
            "A technical fault on our side prevented you from using the service.",
            "Credits were purchased through unauthorised use of your payment method, once verified.",
          ]}
        />
      </Section>

      <Section heading="4. When we do not refund">
        <Bullets
          items={[
            "You disagree with a prediction or interpretation. Astrology is interpretive, and a reading you dislike is not a defective product. We state this plainly rather than leaving it ambiguous.",
            "A predicted outcome did not occur. We guarantee no outcomes, as stated in our Terms.",
            "You provided an incorrect birth time and the chart was therefore wrong.",
            "The account was closed for abusive behaviour or for breaching our Terms.",
            "More than 7 days have passed since the purchase.",
          ]}
        />
      </Section>

      <Section heading="5. Cancelling a consultation">
        <p>
          You can close a consultation at any time from the consultation page. Messages already sent
          have been delivered and their credits are not returned. There is no subscription to cancel
          — credits are bought as one-off packs, so nothing recurs and nothing auto-renews.
        </p>
      </Section>

      <Section heading="6. How to request a refund">
        <p>
          Email <B field="email" /> from the address on your account with:
        </p>
        <Bullets
          items={[
            "The payment reference or order ID.",
            "The date of purchase.",
            "The reason for the request.",
          ]}
        />
        <p>
          We acknowledge within <strong>2 business days</strong> and decide within{" "}
          <strong>7 business days</strong>.
        </p>
      </Section>

      <Section heading="7. How refunds are paid">
        <p>
          Approved refunds are returned to the <strong>original payment method</strong> through our
          payment processor. Bank processing usually takes <strong>5 to 7 business days</strong>{" "}
          after we approve it; the exact timing is set by your bank or card issuer, not by us. We do
          not refund to a different account, in cash, or as store credit unless you ask for credit
          instead.
        </p>
      </Section>

      <Section heading="8. Chargebacks">
        <p>
          If something has gone wrong, please contact us first — we can usually resolve it faster
          than a chargeback. Raising a chargeback without contacting us may result in the account
          being suspended while the dispute is investigated.
        </p>
      </Section>

      <Section heading="9. Contact">
        <p>
          <B field="email" /> · <B field="phone" /> · {BUSINESS.supportHours}
        </p>
      </Section>
    </LegalPage>
  );
}
