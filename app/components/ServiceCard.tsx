import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ServiceIcon from "./ServiceIcon";
import type { ServiceIconName, ServiceTone } from "../lib/services";

interface ServiceCardProps {
  icon: ServiceIconName;
  tone: ServiceTone;
  title: string;
  desc: string;
  href?: string;
}

export default function ServiceCard({ icon, tone, title, desc, href }: ServiceCardProps) {
  const content = (
    <div className="group relative card hover:border-primary/20 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ease-out p-6 flex flex-col items-start text-right gap-5 cursor-pointer h-full overflow-hidden">
      <div className="absolute -top-10 -left-10 w-28 h-28 rounded-full bg-surface-muted group-hover:scale-150 transition-transform duration-500" />
      <div className="relative">
        <ServiceIcon name={icon} tone={tone} />
      </div>
      <div className="relative flex-1">
        <div className="font-bold text-gray-900 text-base leading-snug">{title}</div>
        <div className="text-sm text-gray-500 mt-2 leading-relaxed">{desc}</div>
      </div>
      <div className="relative flex items-center gap-1.5 text-xs font-medium text-primary opacity-70 group-hover:opacity-100 transition-opacity">
        ابدأ الخدمة
        <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {content}
      </Link>
    );
  }

  return content;
}
