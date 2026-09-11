"use client";

import LegalPage, { Section, Bullets, B, FullAddress } from "@/components/LegalPage";
import { BUSINESS } from "@/lib/legal";

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      subtitle={`How ${BUSINESS.tradingName} collects, uses and protects your information.`}
    >
      <Section heading="1. Who we are">
        <p>
          {BUSINESS.tradingName} is operated by <B field="legalName" /> (<B field="entityType" />),
          registered at <FullAddress />. This policy covers the website{" "}
          <strong>{BUSINESS.websiteDomain}</strong> and the services offered on it.
        </p>
      </Section>

      <Section heading="2. What we collect">
        <p>We collect only what the service needs to function:</p>
        <Bullets
          items={[
            <><strong>Account details</strong> — your name, email address and, if you provide it, your phone number.</>,
            <><strong>Birth details</strong> — date, time and place of birth. These are required to calculate a horoscope and cannot be omitted if you want a chart.</>,
            <><strong>Computed chart data</strong> — the planetary positions and analysis derived from your birth details.</>,
            <><strong>Conversations</strong> — your messages to the AI astrologer and to human astrologers, and their replies.</>,
            <><strong>Wallet activity</strong> — your credit balance and a record of every credit added or spent.</>,
            <><strong>Technical data</strong> — your IP address is used transiently for rate limiting. We do not run third-party analytics or advertising trackers.</>,
          ]}
        />
      </Section>

      <Section heading="3. Sensitive personal information">
        <p>
          Your <strong>date, time and place of birth</strong> are personal information under
          India&apos;s Digital Personal Data Protection Act, 2023. We treat them accordingly: they
          are stored only to provide the service you asked for, they are never sold, and they are
          never used for advertising.
        </p>
      </Section>

      <Section heading="4. Who can see your chart">
        <Bullets
          items={[
            <><strong>You</strong>, whenever you are signed in.</>,
            <><strong>An astrologer</strong> — but only after you start a consultation. Beginning a consultation is what shares your chart and birth details with the astrologer who handles it. No astrologer can browse the charts of people who have not contacted them.</>,
            <><strong>Nobody else.</strong> We do not sell, rent or share your data with advertisers or data brokers.</>,
          ]}
        />
      </Section>

      <Section heading="5. Processing by AI">
        <p>
          When you use the AI astrologer, your question and the relevant parts of your computed
          chart are sent to Google&apos;s Gemini models through Google Cloud Vertex AI so that a
          reply can be generated. We send only what the question needs, not your whole profile. Your
          name, email address and phone number are <strong>not</strong> included in these requests.
        </p>
        <p>
          Google processes this data as our service provider under their Cloud terms. We do not use
          your conversations to train any model.
        </p>
      </Section>

      <Section heading="6. How long we keep it">
        <Bullets
          items={[
            "Account, birth details and chart data: for as long as your account exists.",
            "Conversations: for as long as your account exists, so you can revisit past readings.",
            "Wallet ledger entries: retained after account deletion where required for financial record-keeping, with personal identifiers removed.",
            "Verification codes: deleted within 24 hours.",
          ]}
        />
      </Section>

      <Section heading="7. Your rights">
        <p>Under the DPDP Act you may:</p>
        <Bullets
          items={[
            "Ask for a copy of the personal data we hold about you.",
            "Ask us to correct anything inaccurate.",
            "Ask us to delete your account and personal data.",
            "Withdraw consent for processing, which means closing your account.",
            "Raise a grievance with us, and escalate to the Data Protection Board of India if unresolved.",
          ]}
        />
        <p>
          Write to <B field="email" /> and we will respond within 30 days. You can also export your
          chart yourself at any time from the kundli page.
        </p>
      </Section>

      <Section heading="8. Security">
        <p>
          Passwords are stored using scrypt, a slow hashing function designed to resist brute force
          — we never store or transmit your password in readable form. The site is served over
          HTTPS. Session cookies are HttpOnly, so page scripts cannot read them. Verification codes
          are stored hashed.
        </p>
        <p>
          No system is perfectly secure. If we become aware of a breach affecting your data, we will
          notify you and the Data Protection Board as the law requires.
        </p>
      </Section>

      <Section heading="9. Cookies">
        <p>
          We set one cookie: a session cookie that keeps you signed in. It is essential to the
          service and is not used for tracking or advertising. We do not use third-party cookies.
        </p>
      </Section>

      <Section heading="10. Children">
        <p>
          This service is not intended for anyone under 18. We do not knowingly collect data from
          children. If you believe a child has registered, contact us and we will remove the account.
        </p>
      </Section>

      <Section heading="11. Changes and contact">
        <p>
          If this policy changes materially we will note it on this page and update the date above.
        </p>
        <p>
          Grievance Officer: <B field="legalName" />, <B field="email" />, <B field="phone" />.
          Registered address: <FullAddress />. Support hours: {BUSINESS.supportHours}.
        </p>
      </Section>
    </LegalPage>
  );
}
