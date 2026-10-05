"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Eye, EyeOff } from "lucide-react";

interface LoginModalProps {
  onClose: () => void;
  onSwitchToRegister: () => void;
}

export default function LoginModal({ onClose, onSwitchToRegister }: LoginModalProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-dark/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-sm bg-white rounded-[1.75rem] overflow-hidden text-right shadow-2xl animate-slide-fade">
        <div className="relative bg-gradient-to-bl from-primary to-primary-dark px-6 pt-8 pb-6 text-white">
          <div className="absolute inset-0 bg-grid" />
          <button onClick={onClose} className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors">
            <X className="w-4 h-4" />
          </button>
          <div className="relative flex items-center gap-3">
            <div className="bg-white rounded-xl p-1">
              <Image src="/logo-mark.png" alt="" width={282} height={297} className="h-9 w-auto" />
            </div>
            <div>
              <h2 className="text-lg font-bold">تسجيل الدخول</h2>
              <p className="text-xs text-white/70">أهلًا بيك في بوابة نقابة التجاريين</p>
            </div>
          </div>
        </div>

        <form className="p-6 space-y-4">
          <div>
            <label className="text-sm text-gray-600">رقم القيد / الرقم القومي</label>
            <input type="text" placeholder="أدخل رقم القيد أو الرقم القومي" className="mt-2 field" />
          </div>

          <div>
            <label className="text-sm text-gray-600">كلمة المرور</label>
            <div className="mt-2 relative">
              <input type={showPassword ? "text" : "password"} placeholder="ادخل كلمة المرور" className="field pl-11" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <a href="#" className="text-xs text-primary mt-2 inline-block">
              نسيت كلمة المرور؟
            </a>
          </div>

          <button type="submit" className="w-full btn-primary py-3 rounded-pill font-medium">
            تسجيل الدخول
          </button>

          <div className="text-center text-sm text-gray-500">
            ليس لدي حساب؟{" "}
            <button type="button" onClick={onSwitchToRegister} className="text-primary font-bold">
              تسجيل
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
