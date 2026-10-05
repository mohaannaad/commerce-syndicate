import { Megaphone, FileBadge2, MessageSquareWarning, ReceiptText, IdCard, UserPlus, CalendarHeart, type LucideIcon } from "lucide-react";
import type { ServiceIconName, ServiceTone } from "../lib/services";

const ICONS: Record<ServiceIconName, LucideIcon> = {
  ad: Megaphone,
  certificate: FileBadge2,
  complaint: MessageSquareWarning,
  fees: ReceiptText,
  renewal: IdCard,
  "new-member": UserPlus,
  activities: CalendarHeart,
};

const TONES: Record<ServiceTone, string> = {
  primary: "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white",
  secondary: "bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-white",
  accent: "bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white",
};

const SIZES = {
  sm: { box: "w-10 h-10 rounded-xl", icon: "w-5 h-5" },
  md: { box: "w-14 h-14 rounded-2xl", icon: "w-6 h-6" },
};

// مربع الأيقونة الملوّن اللي بيظهر في كروت الخدمات
export default function ServiceIcon({ name, tone, size = "md" }: { name: ServiceIconName; tone: ServiceTone; size?: "sm" | "md" }) {
  const Icon = ICONS[name] ?? FileBadge2;
  const s = SIZES[size];
  return (
    <div className={`${s.box} ${TONES[tone]} flex items-center justify-center shrink-0 transition-colors duration-300`}>
      <Icon className={s.icon} strokeWidth={1.8} />
    </div>
  );
}
