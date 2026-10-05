import ServiceCard from "./ServiceCard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { servicesByKeys } from "../lib/services";
import { getFeaturedServiceKeys } from "../lib/featuredServices";

// الخدمات الـ 5 بتتقري من قاعدة البيانات (الموظف بيختارها من الداشبورد)
export default async function ServicesSection() {
  const services = servicesByKeys(await getFeaturedServiceKeys());

  return (
    <section className="relative bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="text-right">
            <span className="text-xs font-bold tracking-wider text-accent">الخدمات الإلكترونية</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">الخدمات</h2>
            <p className="mt-3 text-gray-500">خدمات إلكترونية لتسهيل معاملاتك النقابية</p>
          </div>
          <Link href="/services" className="group self-start md:self-auto inline-flex items-center gap-2 border border-gray-200 hover:border-primary text-gray-800 hover:text-primary px-6 py-3 rounded-pill text-sm font-medium transition-colors">
            جميع الخدمات
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {services.map((service) => (
            <ServiceCard key={service.key} icon={service.icon} tone={service.tone} title={service.title} desc={service.desc} href={service.href} />
          ))}
        </div>
      </div>
    </section>
  );
}
