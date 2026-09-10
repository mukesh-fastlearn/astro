"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Sparkles, Loader2, AlertCircle } from "lucide-react";
import { BirthChart } from "@/lib/astrology/kundli";
import { buildChartContext, ChartContext } from "@/lib/astrology/context";
import { retrieve } from "@/lib/astrology/knowledge-graph";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "What are my main strengths in this chart?",
  "What does my current dasha period mean?",
  "Tell me about marriage from my D9 chart.",
  "Which career direction suits this chart?",
];

export default function AstroChat({
  chart,
  meta,
}: {
  chart: BirthChart;
  meta?: ChartContext["meta"];
}) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  async function send(text: string) {
    const question = text.trim();
    if (!question || busy) return;

    const next: Msg[] = [...messages, { role: "user", content: question }];
    setMessages(next);
    setInput("");
    setBusy(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          chart: buildChartContext(chart, meta),
          messages: next,
          // Structured retrieval over the knowledge graph, scoped to this question.
          knowledge: retrieve(question, 40),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setMessages([...next, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setMessages(next);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="bg-white rounded-[2rem] shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-primary-red to-primary-saffron px-6 py-5 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-serif text-xl font-bold text-white leading-tight">Ask About Your Chart</h3>
          <p className="text-white/80 text-xs font-medium">
            Answers are based only on the chart calculated above.
          </p>
        </div>
      </div>

      <div ref={scrollRef} className="max-h-[28rem] overflow-y-auto px-6 py-5 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-4">
            <p className="text-gray-600 font-medium mb-5 text-sm">
              Ask anything about the placements in your kundli.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="px-4 py-2 rounded-full border border-primary-saffron/30 text-primary-red text-xs font-bold hover:bg-primary-saffron/10 transition text-left"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
            <div
              className={
                m.role === "user"
                  ? "max-w-[85%] rounded-2xl rounded-br-sm bg-primary-red text-white px-4 py-3 text-sm font-medium whitespace-pre-wrap"
                  : "max-w-[90%] rounded-2xl rounded-bl-sm bg-primary-cream text-gray-800 px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap"
              }
            >
              {m.content}
            </div>
          </div>
        ))}

        {busy && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-bl-sm bg-primary-cream px-4 py-3 flex items-center gap-2 text-gray-600 text-sm">
              <Loader2 className="w-4 h-4 animate-spin" /> Reading your chart…
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-start gap-2 text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="border-t border-gray-100 p-4 flex gap-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={busy}
          maxLength={4000}
          placeholder="Ask about career, marriage, dasha…"
          className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-saffron focus:ring-2 focus:ring-primary-saffron/20 outline-none text-sm font-medium disabled:bg-gray-50"
        />
        <button
          type="submit"
          disabled={busy || !input.trim()}
          className="px-5 py-3 rounded-xl saffron-button font-bold flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      <p className="px-6 pb-4 text-[11px] text-gray-400 leading-relaxed">
        Traditional Vedic interpretation for guidance and reflection. Not medical, legal or
        financial advice.
      </p>
    </div>
  );
}
