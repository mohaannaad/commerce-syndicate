// =====================================================================
// قائمة كل خدمات الموقع في مكان واحد
// ---------------------------------------------------------------------
// صفحة "الخدمات" والصفحة الرئيسية والداشبورد بيقروا من هنا.
// لو ضفت خدمة جديدة للموقع، ضيفها هنا بس وهتظهر في كل الأماكن.
// key  = اسم ثابت بالإنجليزي للخدمة (متغيروش بعد ما يتحفظ)
// icon = اسم الأيقونة من ملف components/ServiceIcon.tsx
// tone = لون مربع الأيقونة (primary / secondary / accent)
// =====================================================================

export type ServiceIconName = "ad" | "certificate" | "complaint" | "fees" | "renewal" | "new-member" | "activities";
export type ServiceTone = "primary" | "secondary" | "accent";

export interface SiteService {
  key: string;
  icon: ServiceIconName;
  tone: ServiceTone;
  title: string;
  desc: string;
  href: string;
}

export const ALL_SERVICES: SiteService[] = [
  { key: "ad", icon: "ad", tone: "accent", title: "اضافة اعلان", desc: "انشاء وادارة إعلاناتك داخل المنصة", href: "/services/ad" },
  { key: "certificate", icon: "certificate", tone: "primary", title: "استخراج شهادة", desc: "طلب الشهادات الرسمية ومتابعتها بشكل فوري", href: "/certificates" },
  { key: "complaint", icon: "complaint", tone: "secondary", title: "تقديم شكوى", desc: "إرسال الشكاوى ومتابعتها إلكترونيًا", href: "/services/complaint" },
  { key: "fees", icon: "fees", tone: "primary", title: "رسوم", desc: "جميع الرسوم المعتمدة لخدمات النقابة", href: "/services/fees" },
  { key: "renewal", icon: "renewal", tone: "secondary", title: "تجديد الاشتراك وتجديد الكارنيه", desc: "سداد الاشتراك السنوي وتجديد بطاقة العضوية", href: "/services/renew-card" },
  { key: "new-member", icon: "new-member", tone: "accent", title: "عضو جديد", desc: "بدء إجراءات الانضمام لنقابة التجاريين", href: "/register/new-graduate" },
  { key: "activities", icon: "activities", tone: "primary", title: "الرحلات والفعاليات", desc: "احجز في الرحلات والكورسات والفعاليات القادمة", href: "/services/activities" },
];

// عدد الخدمات اللي بتظهر في الصفحة الرئيسية
export const FEATURED_COUNT = 5;

// الخدمات اللي بتظهر لو الموظف لسه ما اختارش
export const DEFAULT_FEATURED = ["ad", "certificate", "complaint", "fees", "renewal"];

// بتاخد قائمة keys وترجع الخدمات بنفس الترتيب (وبتتجاهل أي key مش موجود)
export function servicesByKeys(keys: string[]) {
  return keys.map((key) => ALL_SERVICES.find((s) => s.key === key)).filter((s): s is SiteService => !!s);
}

// بتتأكد إن القائمة فيها 5 خدمات بالظبط، موجودين فعلًا، ومفيش تكرار
export function isValidFeatured(keys: unknown): keys is string[] {
  return (
    Array.isArray(keys) &&
    keys.length === FEATURED_COUNT &&
    new Set(keys).size === keys.length &&
    keys.every((k) => typeof k === "string" && ALL_SERVICES.some((s) => s.key === k))
  );
}
