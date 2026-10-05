"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ShieldCheck, TrendingUp, IdCard, FileBadge2 } from "lucide-react";

// البانرات الـ 3 (بتتبدل لوحدها كل 7 ثواني)
const slides = [
  { tag: "التحول الرقمي", title: "خدمات نقابية إلكترونية… أسهل وأسرع", subtitle: "نحو تجربة رقمية متكاملة تتيح لأعضاء النقابة إنجاز العديد من الخدمات والاستعلامات إلكترونيًا بكل سهولة." },
  { tag: "خدمة الأعضاء", title: "نطوّر خدماتنا لخدمة التجاريين", subtitle: "تعمل النقابة على تطوير خدماتها وتحسين تجربة الأعضاء، بما يواكب التحول الرقمي واحتياجات أصحاب المهن التجارية." },
  { tag: "الأخبار والفعاليات", title: "تابع أحدث أخبار وفعاليات النقابة", subtitle: "كن على اطلاع دائم بآخر قرارات النقابة، والفعاليات، والأنشطة، وكل ما يهم أعضاء نقابة التجاريين." },
];

const highlights = [
  { icon: IdCard, label: "تجديد الكارنيه أونلاين" },
  { icon: FileBadge2, label: "شهادات رسمية" },
  { icon: ShieldCheck, label: "بيانات آمنة" },
];

export default function HeroSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white px-3 md:px-6 pt-3">
      <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-bl from-primary via-primary-dark to-dark min-h-[520px] md:min-h-[540px]">
        {/* شبكة الرسم البياني + خط النمو (مستوحاة من اللوجو) */}
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute -top-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-secondary/40 blur-3xl" />
        <div className="absolute -bottom-40 right-1/3 w-[24rem] h-[24rem] rounded-full bg-accent/20 blur-3xl" />
        <svg className="absolute inset-x-0 bottom-0 w-full h-2/3 pointer-events-none" viewBox="0 0 1200 360" preserveAspectRatio="none" fill="none">
          <defs>
            <linearGradient id="heroLine" x1="0" x2="1">
              <stop offset="0%" stopColor="#e3101e" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#e3101e" stopOpacity="0.15" />
            </linearGradient>
            <linearGradient id="heroArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e3101e" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#e3101e" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 330 L120 270 L200 300 L320 210 L420 240 L540 150 L640 190 L760 110 L860 140 L980 60 L1080 90 L1200 20 L1200 360 L0 360 Z" fill="url(#heroArea)" />
          <path className="animate-draw" d="M0 330 L120 270 L200 300 L320 210 L420 240 L540 150 L640 190 L760 110 L860 140 L980 60 L1080 90 L1200 20" stroke="url(#heroLine)" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
        </svg>

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-14 md:py-20 grid md:grid-cols-[1.25fr_1fr] gap-10 items-center">
          {/* النص */}
          <div key={active} className="text-right animate-slide-fade">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 backdrop-blur text-white/90 text-xs font-medium px-3 py-1.5 rounded-pill">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              {slides[active].tag}
            </span>
            <h1 className="mt-5 text-3xl md:text-5xl font-bold text-white leading-[1.35] md:leading-[1.3]">{slides[active].title}</h1>
            <p className="mt-4 text-white/75 text-sm md:text-lg leading-relaxed max-w-xl">{slides[active].subtitle}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/services" className="group inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-pill text-sm font-bold shadow-lg shadow-black/20 hover:shadow-xl transition-all">
                الخدمات الإلكترونية
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              </Link>
              <button className="inline-flex items-center gap-2 border border-white/25 text-white px-6 py-3 rounded-pill text-sm font-medium hover:bg-white/10 transition-colors">
                اقرأ المزيد
              </button>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
              {highlights.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-white/70 text-xs md:text-sm">
                  <Icon className="w-4 h-4 text-white/90" />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* كارت العضوية (ديكور) */}
          <div className="hidden md:flex justify-center">
            <div className="relative w-full max-w-sm">
              <div className="absolute -inset-4 rounded-[2rem] bg-white/5 border border-white/10 rotate-3" />
              <div className="relative rounded-[1.75rem] bg-white/10 border border-white/20 backdrop-blur-xl p-6 text-white shadow-2xl">
                <div className="flex items-center justify-between">
                  <div className="bg-white rounded-2xl p-1.5">
                    <Image src="/logo-mark.png" alt="" width={282} height={297} className="h-11 w-auto" />
                  </div>
                  <span className="text-[11px] bg-white/15 px-2.5 py-1 rounded-pill">بطاقة عضوية</span>
                </div>
                <div className="mt-8 space-y-1">
                  <div className="text-white/60 text-xs">اسم العضو</div>
                  <div className="font-bold text-lg">أحمد محمد علي</div>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-white/60 text-xs">رقم القيد</div>
                    <div className="font-bold mt-0.5" dir="ltr" style={{ textAlign: "right" }}>12345</div>
                  </div>
                  <div>
                    <div className="text-white/60 text-xs">سارية حتى</div>
                    <div className="font-bold mt-0.5">2026</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-8 -right-6 bg-white rounded-2xl shadow-2xl p-4 flex items-center gap-3 w-56">
                <div className="w-11 h-11 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-gray-400">طلبات تمت إلكترونيًا</div>
                  <div className="font-bold text-gray-900">+ 12,500</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 inset-x-0 flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all ${i === active ? "w-8 bg-white" : "w-1.5 bg-white/40"}`}
              aria-label={`الانتقال للبانر ${i + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
