"use client";

import { CheckCircle2 } from "lucide-react";

interface SuccessModalProps {
  title: string;
  message: string;
  buttonLabel?: string;
  onClose: () => void;
}

export default function SuccessModal({ title, message, buttonLabel = "حسنًا", onClose }: SuccessModalProps) {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-dark/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm bg-white rounded-[1.75rem] p-8 text-center shadow-2xl animate-slide-fade">
        <div className="relative w-20 h-20 mx-auto">
          <div className="absolute inset-0 rounded-full bg-secondary/10 animate-ping" />
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-secondary/15 to-primary/15 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-secondary" />
          </div>
        </div>
        <h3 className="mt-6 font-bold text-xl text-gray-900">{title}</h3>
        <p className="mt-2 text-sm text-gray-500 leading-relaxed">{message}</p>
        <button onClick={onClose} className="mt-7 w-full btn-primary py-3 rounded-pill font-medium">
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}
