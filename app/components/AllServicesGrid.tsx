import { Headset } from "lucide-react";
import { ALL_SERVICES } from "../lib/services";
import ServiceCard from "./ServiceCard";

export default function AllServicesGrid() {
  return (
    <section className="bg-surface-muted py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ALL_SERVICES.map((service) => (
            <ServiceCard key={service.key} icon={service.icon} tone={service.tone} title={service.title} desc={service.desc} href={service.href} />
          ))}
        </div>

        <div className="mt-14 card p-6 md:p-8 flex flex-col md:flex-row items-center gap-5 text-center md:text-right">
          <div className="w-14 h-14 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
            <Headset className="w-6 h-6" />
          </div>
          <p className="text-gray-600 leading-loose flex-1">
            في حال واجهت أي مشكلة أثناء استخدام أي خدمة، يمكنك التواصل مع فريق الدعم الفني الخاص بالنقابة. والمتوفر للرد على الاستفسارات ومتابعة الطلبات خطوة بخطوة.
          </p>
        </div>
      </div>
    </section>
  );
}
