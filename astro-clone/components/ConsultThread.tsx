"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Send, Loader2, AlertCircle, Lock } from "lucide-react";
import { api, ApiError, ConsultMessage, Consultation } from "@/lib/api";
import { useAuth } from "@/components/AuthProvider";

/**
 * The message thread, shared by the user and astrologer views.
 *
 * New messages arrive by polling rather than websockets: the backend is a
 * single plain Node process behind Caddy, and a 4-second poll on an open
 * thread is far simpler to keep correct than a socket layer. Polling only runs
 * while the thread is on screen.
 */
export default function ConsultThread({
  consultationId,
  consultation,
  initialMessages,
  onBalanceChange,
}: {
  consultationId: string;
  consultation: Consultation;
  initialMessages: ConsultMessage[];
  onBalanceChange?: (n: number) => void;
}) {
  const { user, costPerMessage, balance } = useAuth();
  const [messages, setMessages] = useState<ConsultMessage[]>(initialMessages);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const isUser = user?.id === consultation.user_id;
  const closed = consultation.status === "closed";

  useEffect(() => {
    boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const poll = useCallback(async () => {
    if (closed) return;
    const last = messages[messages.length - 1]?.created_at;
    try {
      const r = await api.messagesSince(consultationId, last);
      if (r.messages.length) setMessages((m) => [...m, ...r.messages]);
    } catch {
      // A dropped poll is not worth surfacing; the next one will catch up.
    }
  }, [consultationId, messages, closed]);

  useEffect(() => {
    if (closed) return;
    const t = setInterval(poll, 4000);
    return () => clearInterval(t);
  }, [poll, closed]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const body = text.trim();
    if (!body || busy) return;
    setBusy(true);
    setError(null);
    try {
      const r = await api.sendMessage(consultationId, body);
      setMessages(r.messages);
      setText("");
      if (typeof r.balance === "number") onBalanceChange?.(r.balance);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not send. Try again.");
    } finally {
      setBusy(false);
    }
  }

  const affordable = !isUser || balance >= costPerMessage;

  return (
    <div className="bg-white rounded-[2rem] shadow-lg border border-gray-100 overflow-hidden flex flex-col">
      <div className="bg-gradient-to-r from-primary-red to-primary-saffron px-5 py-4">
        <h3 className="font-serif text-lg font-bold text-white leading-tight truncate">
          {consultation.subject}
        </h3>
        <p className="text-white/80 text-xs font-medium">
          {isUser
            ? consultation.astrologer_name
              ? `with ${consultation.astrologer_name}`
              : "waiting for an astrologer to pick this up"
            : `from ${consultation.user_name}`}
        </p>
      </div>

      <div ref={boxRef} className="flex-1 min-h-[16rem] max-h-[26rem] overflow-y-auto px-4 py-4 space-y-3">
        {messages.length === 0 && (
          <p className="text-center text-sm text-gray-500 py-8">
            No messages yet. {isUser ? "Ask your question below." : "Say hello to open the conversation."}
          </p>
        )}
        {messages.map((m) => {
          const mine = m.sender_id === user?.id;
          return (
            <div key={m.id} className={mine ? "flex justify-end" : "flex justify-start"}>
              <div className={mine
                ? "max-w-[85%] rounded-2xl rounded-br-sm bg-primary-red text-white px-4 py-2.5 text-sm whitespace-pre-wrap"
                : "max-w-[85%] rounded-2xl rounded-bl-sm bg-primary-cream text-gray-800 px-4 py-2.5 text-sm whitespace-pre-wrap"}>
                {!mine && (
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-primary-red/70 mb-0.5">
                    {m.sender_name}
                  </span>
                )}
                {m.body}
              </div>
            </div>
          );
        })}
      </div>

      {error && (
        <div className="mx-4 mb-3 flex items-start gap-2 text-red-700 bg-red-50 border border-red-200 rounded-xl px-3 py-2 text-sm">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {closed ? (
        <div className="border-t border-gray-100 px-5 py-4 flex items-center gap-2 text-sm text-gray-500">
          <Lock className="w-4 h-4" /> This consultation is closed.
        </div>
      ) : (
        <form onSubmit={send} className="border-t border-gray-100 p-3 flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={busy || !affordable}
            maxLength={4000}
            placeholder={affordable ? "Type your message…" : "Not enough credits"}
            className="flex-1 min-w-0 px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-saffron focus:ring-2 focus:ring-primary-saffron/20 outline-none text-base disabled:bg-gray-50"
          />
          <button
            type="submit"
            disabled={busy || !text.trim() || !affordable}
            className="px-4 py-3 rounded-xl saffron-button font-bold disabled:opacity-40 shrink-0"
            aria-label="Send message"
          >
            {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </form>
      )}

      {isUser && !closed && (
        <p className="px-5 pb-4 text-[11px] text-gray-400">
          {costPerMessage} credits per message. Replies from the astrologer are free.
        </p>
      )}
    </div>
  );
}
