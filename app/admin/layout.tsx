"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Newspaper, Megaphone, LayoutDashboard, Bell, AlertTriangle, CircleDollarSign, CalendarDays, FileText, GraduationCap, IdCard, LayoutGrid, Menu, X, ExternalLink, Search, UserCog } from "lucide-react";

const menuGroups = [
  {
    title: "عام",
    items: [
      { label: "لوحة التحكم", href: "/admin", icon: LayoutDashboard },
      { label: "خدمات الرئيسية", href: "/admin/home-services", icon: LayoutGrid },
      { label: "الأخبار", href: "/admin/news", icon: Newspaper },
    ],
  },
  {
    title: "طلبات الأعضاء",
    items: [
      { label: "طلبات القيد", href: "/admin/graduates", icon: GraduationCap },
      { label: "تجديد الاشتراك والكارنيه", href: "/admin/renewals", icon: IdCard },
      { label: "الشهادات", href: "/admin/certificates", icon: FileText },
      { label: "الشكاوى", href: "/admin/complaints", icon: AlertTriangle },
      { label: "الإعلانات", href: "/admin/ads", icon: Megaphone },
    ],
  },
  {
    title: "الإعدادات",
    items: [
      { label: "الرحلات والفعاليات", href: "/admin/activities", icon: CalendarDays },
      { label: "الرسوم", href: "/admin/fees", icon: CircleDollarSign },
    ],
  },
];

const menuItems = menuGroups.flatMap((g) => g.items);

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // المنيو بتفضل مفتوحة بس على نفس الصفحة اللي اتفتحت فيها (أول ما الصفحة تتغير بتقفل لوحدها)
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const mobileOpen = openedOn === pathname;
  const setMobileOpen = (open: boolean) => setOpenedOn(open ? pathname : null);

  const activeItem = menuItems.find((item) => (item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href))) ?? menuItems[0];

  const sidebar = (
    <aside className="relative w-72 h-full bg-dark text-white flex flex-col overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary/40 blur-3xl pointer-events-none" />

      <div className="relative p-5 flex items-center gap-3">
        <Link href="/" className="bg-white rounded-xl p-1.5 shrink-0">
          <Image src="/logo-mark.png" alt="نقابة التجاريين" width={282} height={297} className="h-9 w-auto" />
        </Link>
        <div className="leading-tight">
          <p className="font-bold">نقابة التجاريين</p>
          <p className="text-[11px] text-white/50">لوحة التحكم</p>
        </div>
      </div>

      <nav className="relative px-3 pb-4 flex-1 overflow-y-auto space-y-6">
        {menuGroups.map((group) => (
          <div key={group.title}>
            <p className="px-3 mb-2 text-[11px] font-medium text-white/35">{group.title}</p>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = item.href === activeItem.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive ? "bg-white text-primary shadow-lg shadow-black/20" : "text-white/65 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {item.label}
                    {isActive && <span className="absolute left-3 w-1.5 h-1.5 rounded-full bg-accent" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="relative m-3 p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
          <UserCog className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium truncate">إدارة الحاسب الآلي</p>
          <p className="text-[11px] text-white/45 truncate">مسؤول النظام</p>
        </div>
        <Link href="/" title="فتح الموقع" className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-white/60">
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>
    </aside>
  );

  return (
    <div dir="rtl" className="flex h-screen bg-surface-muted overflow-hidden">
      <div className="hidden lg:block shrink-0">{sidebar}</div>

      {/* القائمة في الموبايل */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-dark/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="relative h-full">{sidebar}</div>
        </div>
      )}

      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <header className="h-16 bg-white/80 backdrop-blur border-b border-gray-100 flex items-center justify-between gap-4 px-4 md:px-6 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <button onClick={() => setMobileOpen(true)} className="lg:hidden w-9 h-9 rounded-xl bg-surface-muted flex items-center justify-center text-gray-600" aria-label="القائمة">
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
            <div className="min-w-0">
              <p className="text-[11px] text-gray-400">لوحة التحكم</p>
              <h1 className="font-bold text-gray-900 truncate">{activeItem.label}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 bg-surface-muted rounded-xl px-3 py-2 w-60">
              <Search className="w-4 h-4 text-gray-400" />
              <input placeholder="بحث سريع..." className="bg-transparent outline-none text-sm w-full" />
            </div>
            <button className="relative w-9 h-9 rounded-xl bg-surface-muted flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-accent ring-2 ring-white" />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-6">{children}</div>
      </div>
    </div>
  );
}
