import NewsCard from "./NewsCard";
import AdBanner from "./AdBanner";
import { Newspaper } from "lucide-react";
import { prisma } from "../lib/prisma";

interface NewsSectionProps {
  title?: string;
  subtitle?: string;
  useRealData?: boolean;
  muted?: boolean;
}

export default async function NewsSection({ title = "أخر الاخبار", subtitle = "تابع اخر الاخبار والفعاليات", useRealData = true, muted = false }: NewsSectionProps) {
  const news = useRealData ? await prisma.news.findMany({ orderBy: { order: "asc" } }) : [];

  const firstGroup = news.slice(0, 4);
  const secondGroup = news.slice(4, 6);

  return (
    <section className={`${muted ? "bg-white" : "bg-surface-muted"} py-20`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-right">
          <span className="text-xs font-bold tracking-wider text-accent">المركز الإعلامي</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">{title}</h2>
          <p className="mt-3 text-gray-500">{subtitle}</p>
        </div>

        {useRealData ? (
          <>
            {firstGroup.length > 0 && (
                            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
                {firstGroup.map((item) => (
                  <NewsCard key={item.id} id={item.id} type={item.type} title={item.title} content={item.content} imageUrl={item.imageUrl} youtubeUrl={item.youtubeUrl} createdAt={item.createdAt.toString()} />
                ))}
              </div>
            )}

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-5">
              <AdBanner variant="dark" />
              <AdBanner variant="blue" />
            </div>

            {secondGroup.length > 0 && (
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
                {secondGroup.map((item) => (
                  <NewsCard key={item.id} id={item.id} type={item.type} title={item.title} content={item.content} imageUrl={item.imageUrl} youtubeUrl={item.youtubeUrl} createdAt={item.createdAt.toString()} />
                ))}
              </div>
            )}

            {news.length === 0 && <EmptyState text="لا توجد أخبار حاليًا" />}
          </>
        ) : (
          <EmptyState text="قريبًا: أخبار النقابات الفرعية" />
        )}
      </div>
    </section>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="mt-10 border-2 border-dashed border-gray-200 rounded-3xl py-14 flex flex-col items-center gap-3 text-gray-400">
      <Newspaper className="w-8 h-8" />
      <p>{text}</p>
    </div>
  );
}
