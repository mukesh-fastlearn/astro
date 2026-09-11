// Typed client for the backend. Same-origin, so the session cookie travels
// automatically — nothing here handles tokens by hand.

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: "user" | "astrologer" | "admin";
  phone: string | null;
  bio: string | null;
  expertise: string | null;
  isAvailable: boolean;
  createdAt: string;
}

export interface BirthProfile {
  user_id: string;
  dob: string;
  tob: string;
  pob: string;
  latitude: number;
  longitude: number;
  tz_offset: string;
  gender: string | null;
}

export interface LedgerRow {
  delta: number;
  balance_after: number;
  reason: string;
  ref: string | null;
  created_at: string;
}

export interface Consultation {
  id: string;
  user_id: string;
  astrologer_id: string | null;
  subject: string;
  status: "open" | "assigned" | "closed";
  created_at: string;
  updated_at: string;
  astrologer_name?: string | null;
  user_name?: string;
  user_email?: string;
}

export interface ConsultMessage {
  id: string;
  consultation_id: string;
  sender_id: string;
  sender_role: string;
  sender_name: string;
  body: string;
  created_at: string;
}

export class ApiError extends Error {
  status: number;
  balance?: number;
  constructor(message: string, status: number, balance?: number) {
    super(message);
    this.status = status;
    this.balance = balance;
  }
}

async function req<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    credentials: "same-origin",
    headers: init?.body ? { "content-type": "application/json" } : undefined,
    ...init,
  });

  let data: unknown = null;
  try {
    data = await res.json();
  } catch {
    /* some responses have no body */
  }

  if (!res.ok) {
    const d = data as { error?: string; balance?: number } | null;
    throw new ApiError(d?.error || `Request failed (${res.status})`, res.status, d?.balance);
  }
  return data as T;
}

export const api = {
  register: (b: { email: string; password: string; name: string; phone?: string }) =>
    req<{ user: AuthUser; balance: number; signupBonus: number }>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(b),
    }),

  login: (b: { email: string; password: string }) =>
    req<{ user: AuthUser; balance: number }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(b),
    }),

  logout: () => req<{ ok: true }>("/api/auth/logout", { method: "POST" }),

  me: () =>
    req<{
      user: AuthUser | null;
      balance?: number;
      birthProfile?: BirthProfile | null;
      costPerMessage?: number;
    }>("/api/auth/me"),

  saveBirth: (b: {
    dob: string; tob: string; pob: string;
    latitude: number; longitude: number; tzOffset?: string; gender?: string;
  }) => req<{ ok: true; birthProfile: BirthProfile }>("/api/profile/birth", {
    method: "POST",
    body: JSON.stringify(b),
  }),

  saveChart: (chart: unknown) =>
    req<{ ok: true }>("/api/profile/chart", { method: "POST", body: JSON.stringify({ chart }) }),

  wallet: () =>
    req<{ balance: number; costPerMessage: number; ledger: LedgerRow[] }>("/api/wallet"),

  astrologers: () =>
    req<{ astrologers: { id: string; name: string; bio: string | null; expertise: string | null; is_available: number }[] }>(
      "/api/astrologers"
    ),

  consultations: () => req<{ consultations: Consultation[] }>("/api/consultations"),

  createConsultation: (subject: string) =>
    req<{ id: string }>("/api/consultations", { method: "POST", body: JSON.stringify({ subject }) }),

  consultation: (id: string) =>
    req<{
      consultation: Consultation;
      messages: ConsultMessage[];
      userChart: { chart: unknown; computedAt: string } | null;
      userBirthProfile: BirthProfile | null;
    }>(`/api/consultations/${id}`),

  messagesSince: (id: string, since?: string) =>
    req<{ messages: ConsultMessage[] }>(
      `/api/consultations/${id}/messages${since ? `?since=${encodeURIComponent(since)}` : ""}`
    ),

  sendMessage: (id: string, body: string) =>
    req<{ messages: ConsultMessage[]; balance: number }>(`/api/consultations/${id}/messages`, {
      method: "POST",
      body: JSON.stringify({ body }),
    }),

  claim: (id: string) => req<{ ok: true }>(`/api/consultations/${id}/claim`, { method: "POST" }),

  close: (id: string) => req<{ ok: true }>(`/api/consultations/${id}/close`, { method: "POST" }),

  aiSessions: () =>
    req<{ sessions: { session_id: string; started: string; messages: number; first_question: string }[] }>(
      "/api/ai/sessions"
    ),

  aiHistory: (session: string) =>
    req<{ messages: { role: string; body: string; created_at: string }[] }>(
      `/api/ai/history?session=${encodeURIComponent(session)}`
    ),
};
