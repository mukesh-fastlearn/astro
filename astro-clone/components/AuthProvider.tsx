"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { api, AuthUser, BirthProfile } from "@/lib/api";

interface AuthState {
  user: AuthUser | null;
  balance: number;
  birthProfile: BirthProfile | null;
  costPerMessage: number;
  loading: boolean;
  refresh: () => Promise<void>;
  setBalance: (n: number) => void;
  logout: () => Promise<void>;
}

const Ctx = createContext<AuthState>({
  user: null,
  balance: 0,
  birthProfile: null,
  costPerMessage: 20,
  loading: true,
  refresh: async () => {},
  setBalance: () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [balance, setBalance] = useState(0);
  const [birthProfile, setBirthProfile] = useState<BirthProfile | null>(null);
  const [costPerMessage, setCost] = useState(20);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const r = await api.me();
      setUser(r.user);
      setBalance(r.balance ?? 0);
      setBirthProfile(r.birthProfile ?? null);
      if (r.costPerMessage) setCost(r.costPerMessage);
    } catch {
      // Signed out, or the API is unreachable — either way, treat as anonymous
      // rather than blocking the page.
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const logout = useCallback(async () => {
    try {
      await api.logout();
    } finally {
      setUser(null);
      setBalance(0);
      setBirthProfile(null);
    }
  }, []);

  return (
    <Ctx.Provider value={{ user, balance, birthProfile, costPerMessage, loading, refresh, setBalance, logout }}>
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => useContext(Ctx);
