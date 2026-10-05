import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}

export default function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div className="bg-surface-muted px-3 md:px-6 pt-3">
      <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-bl from-primary via-primary-dark to-dark py-12 md:py-14">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-secondary/40 blur-3xl" />
        <svg className="absolute left-0 bottom-0 w-1/2 h-full pointer-events-none opacity-60" viewBox="0 0 600 200" preserveAspectRatio="none" fill="none">
          <path d="M0 190 L80 150 L140 170 L230 100 L300 120 L390 60 L460 80 L600 10" stroke="#e3101e" strokeOpacity="0.55" strokeWidth="3" strokeLinejoin="round" />
        </svg>
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="text-right text-white">
            <div className="flex items-center gap-1.5 text-xs text-white/55">
              <Link href="/" className="hover:text-white transition-colors">
                الرئيسية
              </Link>
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="text-white/80">{title}</span>
            </div>
            <h1 className="mt-3 text-3xl md:text-4xl font-bold leading-snug">{title}</h1>
            <p className="mt-2 text-white/70 max-w-2xl leading-relaxed">{subtitle}</p>
          </div>
          {action ? <div className="shrink-0">{action}</div> : null}
        </div>
      </section>
    </div>
  );
}
