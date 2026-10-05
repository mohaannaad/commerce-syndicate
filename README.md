# بوابة نقابة التجاريين

موقع + لوحة تحكم لنقابة التجاريين — نفس الكونسبت والـ flows بتاعة بوابة نقابة الصيادلة، بهوية بصرية جديدة (ألوان اللوجو: بنفسجي + أزرق + أحمر).

## التشغيل على جهازك

1. `npm install`
2. اعمل ملف `.env` في أول المشروع وفيه:
   ```
   DATABASE_URL="رابط قاعدة البيانات من Neon"
   BLOB_READ_WRITE_TOKEN="توكن Vercel Blob (لرفع الملفات)"
   ```
3. `npx prisma migrate deploy` (بيعمل جداول قاعدة البيانات)
4. `npm run dev` وافتح http://localhost:3000 — والداشبورد على http://localhost:3000/admin

## أماكن مهمة

- الألوان والهوية: `app/globals.css`
- قائمة الخدمات: `app/lib/services.ts`
- قواعد طلب القيد (المستندات / الرسوم / الفئات): `app/lib/graduate.ts`
- أسعار التجديد: `app/lib/renewal.ts`
