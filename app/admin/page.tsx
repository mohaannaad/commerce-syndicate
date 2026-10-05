"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Newspaper, Megaphone, AlertTriangle, CircleDollarSign, CalendarDays, FileText, ChevronLeft, GraduationCap, IdCard, TrendingUp, type LucideIcon } from "lucide-react";

interface Summary {
  news: number;
  ads: number;
  adsPending: number;
  complaints: number;
  complaintsPending: number;
  fees: number;
  activities: number;
  certificates: number;
  certificatesPending: number;
  graduates: number;
  graduatesPending: number;
  renewals: number;
  renewalsPending: number;
}

// بنجيب أي قائمة من الـ API، ولو حصلت مشكلة بنرجع قائمة فاضية عشان الصفحة متقعش
type Item = { status?: string };
async function list(url: string): Promise<Item[]> {
  try {
    const res = await fetch(url);
    const json = await res.json();
    return Array.isArray(json) ? json : [];
  } catch {
    return [];
  }
}

interface Row {
  label: string;
  desc: string;
  href: string;
  icon: LucideIcon;
  tone: string;
  count?: number;
  pending?: number;
}

export default function AdminHomePage() {
  const [summary, setSummary] = useState<Summary | null>(null);

  useEffect(() => {
    async function loadSummary() {
      const [news, ads, complaints, fees, activities, certificates, graduates, renewals] = await Promise.all([
        list("/api/news"),
        list("/api/ads"),
        list("/api/complaints"),
        list("/api/fees"),
        list("/api/activities"),
        list("/api/certificates"),
        list("/api/graduates"),
        list("/api/renewals"),
      ]);

      setSummary({
        news: news.length,
        ads: ads.length,
        adsPending: ads.filter((a) => a.status === "UNDER_REVIEW").length,
        complaints: complaints.length,
        complaintsPending: complaints.filter((c) => c.status === "RECEIVED" || c.status === "UNDER_REVIEW").length,
        fees: fees.length,
        activities: activities.length,
        certificates: certificates.length,
        certificatesPending: certificates.filter((c) => c.status === "AWAITING_PAYMENT" || c.status === "UNDER_REVIEW").length,
        graduates: graduates.length,
        graduatesPending: graduates.filter((g) => g.status === "UNDER_REVIEW").length,
        renewals: renewals.length,
        renewalsPending: renewals.filter((r) => r.status === "RECEIVED" || r.status === "UNDER_REVIEW").length,
      });
    }
    loadSummary();
  }, []);

  const requestRows: Row[] = [
    { label: "طلبات القيد", desc: "طلبات قيد الخريجين الجدد", href: "/admin/graduates", icon: GraduationCap, tone: "bg-accent/10 text-accent", count: summary?.graduates, pending: summary?.graduatesPending },
    { label: "تجديد الاشتراك", desc: "طلبات تجديد الاشتراك والكارنيه", href: "/admin/renewals", icon: IdCard, tone: "bg-secondary/10 text-secondary", count: summary?.renewals, pending: summary?.renewalsPending },
    { label: "الشهادات", desc: "طلبات استخراج الشهادات بأنواعها", href: "/admin/certificates", icon: FileText, tone: "bg-primary/10 text-primary", count: summary?.certificates, pending: summary?.certificatesPending },
    { label: "الشكاوى", desc: "شكاوى ومقترحات الأعضاء وغير الأعضاء", href: "/admin/complaints", icon: AlertTriangle, tone: "bg-orange-100 text-orange-600", count: summary?.complaints, pending: summary?.complaintsPending },
    { label: "الإعلانات", desc: "طلبات الإعلانات المقدمة من الأعضاء", href: "/admin/ads", icon: Megaphone, tone: "bg-sky-100 text-sky-700", count: summary?.ads, pending: summary?.adsPending },
  ];

  const contentRows: Row[] = [
    { label: "الأخبار", desc: "المقالات وفيديوهات اليوتيوب", href: "/admin/news", icon: Newspaper, tone: "bg-primary/10 text-primary", count: summary?.news },
    { label: "الرحلات والفعاليات", desc: "الأنشطة المتاحة على الموقع", href: "/admin/activities", icon: CalendarDays, tone: "bg-secondary/10 text-secondary", count: summary?.activities },
    { label: "الرسوم", desc: "جدول رسوم خدمات النقابة", href: "/admin/fees", icon: CircleDollarSign, tone: "bg-accent/10 text-accent", count: summary?.fees },
  ];

  const totalPending = requestRows.reduce((sum, r) => sum + (r.pending ?? 0), 0);
  const totalRequests = requestRows.reduce((sum, r) => sum + (r.count ?? 0), 0);
  const maxCount = Math.max(1, ...requestRows.map((r) => r.count ?? 0));
  const today = new Date().toLocaleDateString("ar-EG", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const show = (n?: number) => (n === undefined ? "—" : n.toLocaleString("en-US"));

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm text-gray-400">{today}</p>
          <h1 className="text-2xl font-bold text-gray-900 mt-1">أهلاً بيك في لوحة التحكم 👋</h1>
        </div>
      </div>

      {/* ---------- البانر + أرقام سريعة ---------- */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2 relative overflow-hidden rounded-3xl bg-gradient-to-bl from-primary via-primary-dark to-dark text-white">
          <div className="absolute inset-0 bg-grid" />
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-secondary/40 blur-3xl" />
          <svg className="absolute left-0 bottom-0 w-2/3 h-2/3 opacity-70" viewBox="0 0 400 160" preserveAspectRatio="none" fill="none">
            <path className="animate-draw" d="M0 150 L60 120 L100 135 L170 80 L220 95 L290 45 L330 60 L400 10" stroke="#e3101e" strokeWidth="3" strokeLinejoin="round" />
          </svg>
          <div className="relative p-7 md:p-8 flex flex-col justify-between h-full min-h-[200px]">
            <p className="text-white/70 text-sm">طلبات بانتظار إجراء منك</p>
            <div className="flex items-end gap-4 mt-3">
              <p className="text-6xl font-bold leading-none">{summary === null ? "—" : totalPending}</p>
              <p className="text-white/60 text-sm pb-1">من أصل {show(summary === null ? undefined : totalRequests)} طلب</p>
            </div>
            <p className="mt-6 text-white/55 text-sm max-w-sm leading-relaxed">موزعة بين طلبات القيد والتجديد والشهادات والشكاوى والإعلانات المعلقة</p>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-gray-900">توزيع الطلبات</h2>
            <TrendingUp className="w-4 h-4 text-gray-400" />
          </div>
          <div className="mt-5 space-y-4">
            {requestRows.map((r) => (
              <div key={r.href}>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">{r.label}</span>
                  <span className="font-bold text-gray-900">{show(r.count)}</span>
                </div>
                <div className="mt-1.5 h-2 rounded-full bg-surface-muted overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-l from-primary to-secondary transition-all duration-700" style={{ width: `${((r.count ?? 0) / maxCount) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- كروت الطلبات ---------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
        {requestRows.map((row) => {
          const Icon = row.icon;
          return (
            <Link key={row.href} href={row.href} className="group card p-5 hover:shadow-xl hover:-translate-y-0.5 transition-all">
              <div className="flex items-start justify-between">
                <div className={`w-11 h-11 rounded-2xl ${row.tone} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
                {row.pending !== undefined && row.pending > 0 && <span className="text-[11px] bg-accent/10 text-accent px-2 py-1 rounded-pill font-bold">{row.pending} معلّق</span>}
              </div>
              <p className="mt-5 text-3xl font-bold text-gray-900">{show(row.count)}</p>
              <p className="mt-1 text-sm font-medium text-gray-700">{row.label}</p>
              <p className="text-xs text-gray-400 mt-0.5 truncate">{row.desc}</p>
            </Link>
          );
        })}
      </div>

      {/* ---------- إدارة المحتوى ---------- */}
      <div className="card overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">إدارة المحتوى</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {contentRows.map((row) => {
            const Icon = row.icon;
            return (
              <Link key={row.href} href={row.href} className="flex items-center justify-between px-6 py-4 hover:bg-surface-muted transition-colors group">
                <div className="flex items-center gap-4 min-w-0">
                  <div className={`w-10 h-10 rounded-xl ${row.tone} flex items-center justify-center shrink-0`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900">{row.label}</p>
                    <p className="text-xs text-gray-400 truncate">{row.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-lg font-bold text-gray-900 w-8 text-left">{show(row.count)}</span>
                  <ChevronLeft className="w-4 h-4 text-gray-300 group-hover:text-primary group-hover:-translate-x-0.5 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
