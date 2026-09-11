"use client";

import LegalPage, { Section, Bullets, B, FullAddress } from "@/components/LegalPage";
import { BUSINESS, COST_PER_MESSAGE, SIGNUP_CREDITS } from "@/lib/legal";

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms and Conditions"
      subtitle={`The agreement between you and ${BUSINESS.tradingName}.`}
    >
      <Section heading="1. Agreement">
        <p>
          These terms govern your use of <strong>{BUSINESS.websiteDomain}</strong>, operated by{" "}
          <B field="legalName" /> (<B field="entityType" />), registered at <FullAddress />. By
          creating an account you accept them. If you do not accept them, do not use the service.
        </p>
      </Section>

      <Section heading="2. What this service is — and is not">
        <p>
          We provide Vedic astrology calculations and interpretation. The astronomical calculations
          are precise: planetary positions come from a professional ephemeris. The{" "}
          <strong>interpretation</strong> of those positions is traditional astrology.
        </p>
        <p className="font-bold text-gray-900">
          Astrology is not a science, and nothing on this site is a substitute for professional
          advice.
        </p>
        <Bullets
          items={[
            "We do not provide medical advice. Consult a doctor for health matters.",
            "We do not provide legal advice. Consult a lawyer.",
            "We do not provide financial or investment advice. Consult a qualified adviser.",
            "We do not guarantee any outcome, prediction or result.",
            "Remedies — gemstones, mantras, donations, fasting, Lal Kitab measures — are recorded traditional practice, not proven methods of changing events.",
          ]}
        />
      </Section>

      <Section heading="3. Eligibility">
        <p>You must be at least 18 years old and able to enter a contract under Indian law.</p>
      </Section>

      <Section heading="4. Your account">
        <Bullets
          items={[
            "Give accurate details. An inaccurate birth time produces an inaccurate chart, and that is not a fault of the service.",
            "Keep your password confidential. You are responsible for activity under your account.",
            "One account per person. Creating multiple accounts to collect repeated sign-up credits is a breach of these terms and may result in suspension.",
            "Tell us promptly if you suspect unauthorised access.",
          ]}
        />
      </Section>

      <Section heading="5. Credits">
        <Bullets
          items={[
            <span key="1">New accounts receive <strong>{SIGNUP_CREDITS} free credits</strong>. These are a promotional gift with no cash value and are not refundable or transferable.</span>,
            <span key="2">Each message to the AI astrologer or to a human astrologer costs <strong>{COST_PER_MESSAGE} credits</strong>. Replies from astrologers are free.</span>,
            "Purchased credits are added to the same wallet. Every change to your balance is recorded in a ledger you can view on your dashboard.",
            "Credits are for use on this site only. They are not money, cannot be withdrawn, and cannot be transferred between accounts.",
            "If a message fails to produce a reply because of a fault on our side, the credits for it are returned automatically.",
          ]}
        />
      </Section>

      <Section heading="6. Consultations with astrologers">
        <Bullets
          items={[
            "Starting a consultation shares your birth details and computed chart with the astrologer handling it. That is necessary for them to advise you.",
            "Astrologers give their own interpretation. Opinions may differ between astrologers, and between an astrologer and the AI.",
            "Response times are not guaranteed. Astrologers are people, not a queue with a service-level agreement.",
            "Abusive, threatening or harassing messages will end the consultation and may close your account without refund.",
          ]}
        />
      </Section>

      <Section heading="7. Acceptable use">
        <p>You agree not to:</p>
        <Bullets
          items={[
            "Use the service for anything unlawful.",
            "Attempt to breach, probe or overload our systems.",
            "Scrape, copy or resell our calculations, content or data.",
            "Impersonate another person, or submit another person's birth details without their consent.",
            "Use the service to make decisions about other people's medical treatment, employment or legal position.",
          ]}
        />
      </Section>

      <Section heading="8. Intellectual property">
        <p>
          The calculation engine, interpretation text, design and branding belong to us. Your own
          birth details and chart remain yours, and you may export them at any time.
        </p>
      </Section>

      <Section heading="9. Availability">
        <p>
          We aim to keep the service running but do not guarantee uninterrupted availability. We may
          suspend it for maintenance, and may change or discontinue features.
        </p>
      </Section>

      <Section heading="10. Limitation of liability">
        <p>
          To the extent permitted by law, our total liability for any claim is limited to the amount
          you paid us in the three months before the claim arose. We are not liable for decisions
          you take based on a reading, or for indirect or consequential loss.
        </p>
        <p>Nothing here excludes liability that cannot lawfully be excluded.</p>
      </Section>

      <Section heading="11. Termination">
        <p>
          You may close your account at any time by writing to <B field="email" />. We may suspend
          or close an account that breaches these terms. Unused promotional credits are forfeited on
          closure; unused purchased credits are handled under our Refund Policy.
        </p>
      </Section>

      <Section heading="12. Governing law">
        <p>
          These terms are governed by the laws of India. Disputes are subject to the courts of{" "}
          <B field="city" />, <B field="state" />.
        </p>
      </Section>

      <Section heading="13. Contact">
        <p>
          <B field="legalName" /> · <B field="email" /> · <B field="phone" /> · <FullAddress />
        </p>
      </Section>
    </LegalPage>
  );
}
