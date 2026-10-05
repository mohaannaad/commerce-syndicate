"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import LoginModal from "./LoginModal";
import RegisterDropdown from "./RegisterDropdown";
import Brand from "./Brand";

const navLinks = [
  { label: "الرئيسية", href: "/" },
  { label: "الشهادات", href: "/certificates" },
  { label: "الخدمات", href: "/services" },
  { label: "نقابات فرعية", href: "/branches" },
];

export default function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const pathname = usePathname();
  // المنيو بتفضل مفتوحة بس على نفس الصفحة اللي اتفتحت فيها (أول ما الصفحة تتغير بتقفل لوحدها)
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const mobileOpen = openedOn === pathname;
  const setMobileOpen = (open: boolean) => setOpenedOn(open ? pathname : null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  const activeIndex = (() => {
    const exactMatch = navLinks.findIndex((link) => link.href === pathname);
    if (exactMatch !== -1) return exactMatch;

    const partialMatches = navLinks
      .map((link, i) => ({ i, href: link.href }))
      .filter((link) => link.href !== "/" && pathname.startsWith(link.href));

    if (partialMatches.length === 0) return -1;

    return partialMatches.reduce((best, current) => (current.href.length > best.href.length ? current : best)).i;
  })();

  // مؤشر الصفحة الحالية (الخلفية اللي بتتحرك ورا اللينك)
  useEffect(() => {
    const activeLink = linkRefs.current[activeIndex];
    const nav = navRef.current;
    if (activeLink && nav) {
      const linkRect = activeLink.getBoundingClientRect();
      const navRect = nav.getBoundingClientRect();
      setIndicator({ left: linkRect.left - navRect.left, width: linkRect.width });
    } else {
      setIndicator({ left: 0, width: 0 });
    }
  }, [activeIndex, pathname]);

  // الهيدر بياخد ظل خفيف لما المستخدم ينزل في الصفحة
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? "bg-white/85 backdrop-blur-xl shadow-[0_8px_30px_-12px_rgba(23,12,34,0.15)]" : "bg-white"}`}>
      <div className="h-1 w-full bg-gradient-to-l from-primary via-secondary to-accent" />
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="shrink-0">
          <Brand />
        </Link>

        <nav ref={navRef} className="hidden md:flex items-center gap-1 text-sm font-medium relative bg-surface-muted rounded-pill p-1">
          <span
            className="absolute top-1 bottom-1 rounded-pill bg-white shadow-sm transition-all duration-300 ease-out"
            style={{ left: indicator.left, width: indicator.width, opacity: indicator.width ? 1 : 0 }}
          />
          {navLinks.map((link, i) => (
            <Link
              key={link.label}
              href={link.href}
              ref={(el) => {
                linkRefs.current[i] = el;
              }}
              className={`relative px-4 py-2 rounded-pill transition-colors ${i === activeIndex ? "text-primary" : "text-gray-600 hover:text-primary"}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden xl:flex items-center bg-surface-muted border border-transparent focus-within:border-primary/30 focus-within:bg-white rounded-pill px-4 py-2 gap-2 w-56 transition-colors">
            <Search className="w-4 h-4 text-gray-400 shrink-0" />
            <input type="text" placeholder="ابحث في الموقع .." className="bg-transparent outline-none text-sm w-full text-right" />
          </div>

          <div className="hidden sm:block">
            <RegisterDropdown />
          </div>

          <button onClick={() => setShowLogin(true)} className="hidden sm:block btn-primary px-5 py-2.5 rounded-pill text-sm font-medium whitespace-nowrap">
            تسجيل دخول
          </button>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden w-10 h-10 rounded-full bg-surface-muted flex items-center justify-center text-gray-700" aria-label="القائمة">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ---------- منيو الموبايل ---------- */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pb-5 pt-3 space-y-1 animate-slide-fade">
          {navLinks.map((link, i) => (
            <Link key={link.label} href={link.href} className={`block px-4 py-3 rounded-xl text-sm font-medium ${i === activeIndex ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-surface-muted"}`}>
              {link.label}
            </Link>
          ))}
          <div className="grid grid-cols-2 gap-2 pt-3">
            <Link href="/register/existing-member" className="text-center bg-secondary/10 text-secondary py-3 rounded-xl text-sm font-medium">
              تسجيل عضو حالي
            </Link>
            <Link href="/register/new-graduate" className="text-center bg-accent/10 text-accent py-3 rounded-xl text-sm font-medium">
              تسجيل خريج جديد
            </Link>
          </div>
          <button onClick={() => setShowLogin(true)} className="w-full btn-primary py-3 rounded-xl text-sm font-medium mt-2">
            تسجيل دخول
          </button>
        </div>
      )}

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} onSwitchToRegister={() => setShowLogin(false)} />}
    </header>
  );
}
