import Image from "next/image";

// اللوجو + اسم النقابة — بيستخدم في الهيدر والفوتر والداشبورد
export default function Brand({ variant = "light", compact = false }: { variant?: "light" | "dark"; compact?: boolean }) {
  const dark = variant === "dark";
  return (
    <div className="flex items-center gap-3">
      <div className={`shrink-0 flex items-center justify-center ${dark ? "bg-white rounded-2xl p-1.5" : ""}`}>
        <Image src="/logo-mark.png" alt="شعار نقابة التجاريين" width={282} height={297} className={compact ? "h-10 w-auto" : "h-12 w-auto"} priority />
      </div>
      <div className="leading-tight">
        <div className={`font-bold ${compact ? "text-base" : "text-lg"} ${dark ? "text-white" : "text-gray-900"}`}>نقابة التجاريين</div>
        <div className={`text-[11px] tracking-wide ${dark ? "text-white/50" : "text-gray-400"}`}>جمهورية مصر العربية</div>
      </div>
    </div>
  );
}
