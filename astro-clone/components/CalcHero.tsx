import { Sparkles } from "lucide-react";

export default function CalcHero({
  badge,
  titleTop,
  titleBottom,
  subtitle,
  tamil,
}: {
  badge: string;
  titleTop: string;
  titleBottom: string;
  subtitle: string;
  tamil?: string;
}) {
  return (
    <div className="text-center mb-10 max-w-3xl mx-auto">
      <div className="mb-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm border border-primary-saffron/20 text-primary-red text-sm font-bold uppercase tracking-widest">
        <Sparkles className="w-4 h-4 text-primary-saffron" />
        <span>{badge}</span>
      </div>
      <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-gray-900 leading-tight">
        <span className="saffron-gradient">{titleTop}</span>
        <br />
        {titleBottom}
      </h1>
      <p className="text-lg text-gray-700 mt-5 leading-relaxed font-medium">{subtitle}</p>
      {tamil && <p className="text-primary-saffron font-bold mt-2">{tamil}</p>}
    </div>
  );
}
