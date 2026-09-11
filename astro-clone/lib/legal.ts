// Business and legal details.
//
// Razorpay's merchant review reads these pages and checks that the operator is
// identifiable and reachable. Anything still marked TODO below will fail that
// review — placeholder text is one of the most common rejection reasons — so
// the pages render a visible warning for each field that has not been filled
// in, rather than quietly publishing a blank.

export interface BusinessDetails {
  legalName: string;
  tradingName: string;
  /** "Proprietorship" | "Partnership" | "Private Limited" | "LLP" */
  entityType: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  email: string;
  phone: string;
  /** Optional, only if registered. */
  gstin?: string;
  /** Optional, only if registered. */
  cin?: string;
  websiteDomain: string;
  supportHours: string;
  /** When these documents last changed. */
  lastUpdated: string;
}

/**
 * FILL THESE IN before submitting to Razorpay. Every value marked TODO is
 * surfaced on the page as an unfilled field.
 */
export const BUSINESS: BusinessDetails = {
  legalName: "TODO: registered legal name",
  tradingName: "Golden Era Astro",
  entityType: "TODO: Proprietorship / Partnership / Private Limited",
  address: "TODO: full street address",
  city: "TODO: city",
  state: "TODO: state",
  pincode: "TODO: PIN code",
  country: "India",
  email: "TODO: support@goldeneraastro.com",
  phone: "TODO: +91 XXXXXXXXXX",
  gstin: undefined,
  cin: undefined,
  websiteDomain: "goldeneraastro.com",
  supportHours: "Monday to Saturday, 10:00 to 19:00 IST",
  lastUpdated: "11 September 2026",
};

export const isTodo = (v?: string) => !v || v.startsWith("TODO");

export const businessIncomplete = () =>
  Object.entries(BUSINESS)
    .filter(([, v]) => typeof v === "string" && isTodo(v))
    .map(([k]) => k);

/** Credit packs. Prices are what Razorpay will charge once connected. */
export interface CreditPack {
  id: string;
  credits: number;
  priceInr: number;
  label: string;
  popular?: boolean;
}

export const CREDIT_PACKS: CreditPack[] = [
  { id: "starter", credits: 500, priceInr: 99, label: "Starter" },
  { id: "regular", credits: 1200, priceInr: 199, label: "Regular", popular: true },
  { id: "premium", credits: 3000, priceInr: 449, label: "Premium" },
  { id: "unlimited", credits: 7000, priceInr: 999, label: "Devotee" },
];

export const COST_PER_MESSAGE = 20;
export const SIGNUP_CREDITS = 501;
