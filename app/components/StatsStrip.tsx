import { Users, Building2, Laptop, Clock3 } from "lucide-react";

// ⚠️ أرقام مبدئية للعرض — تتبدل بالأرقام الرسمية من النقابة
const stats = [
  { icon: Users, value: "+ 750 ألف", label: "عضو مقيد" },
  { icon: Building2, value: "27", label: "نقابة فرعية" },
  { icon: Laptop, value: "7", label: "خدمات إلكترونية" },
  { icon: Clock3, value: "24/7", label: "متاحة طول الوقت" },
];

export default function StatsStrip() {
  return (
    <section className="bg-white px-3 md:px-6">
      <div className="max-w-6xl mx-auto -mt-10 relative z-10">
        <div className="card grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-3 p-5 md:p-6">
              <div className="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg md:text-xl font-bold text-gray-900">{value}</div>
                <div className="text-xs text-gray-500">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
