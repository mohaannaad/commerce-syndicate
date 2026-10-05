"use client";

import { useState } from "react";
import { ChevronDown, UserCheck, GraduationCap } from "lucide-react";

export default function RegisterDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 bg-white border border-gray-200 hover:border-primary/40 text-gray-800 px-4 py-2.5 rounded-pill text-sm font-medium whitespace-nowrap transition-colors"
      >
        تسجيل
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />}

      {open && (
        <div className="absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 p-2 animate-slide-fade">
          <a href="/register/existing-member" className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-muted text-right">
            <span className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
              <UserCheck className="w-5 h-5" />
            </span>
            <span>
              <span className="block text-sm font-bold text-gray-900">تسجيل عضو حالي</span>
              <span className="block text-xs text-gray-400 mt-0.5">إنشاء حساب برقم القيد والرقم القومي</span>
            </span>
          </a>
          <a href="/register/new-graduate" className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-muted text-right">
            <span className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5" />
            </span>
            <span>
              <span className="block text-sm font-bold text-gray-900">تسجيل خريج جديد</span>
              <span className="block text-xs text-gray-400 mt-0.5">تقديم طلب القيد لأول مرة</span>
            </span>
          </a>
        </div>
      )}
    </div>
  );
}
