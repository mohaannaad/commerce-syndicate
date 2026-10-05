import Link from "next/link";
import { Newspaper, Play, CalendarDays } from "lucide-react";

interface NewsCardProps {
  id: string;
  type: "YOUTUBE" | "ARTICLE";
  title: string;
  content: string | null;
  imageUrl: string | null;
  youtubeUrl: string | null;
  createdAt: string;
}

export default function NewsCard({ id, type, title, content, imageUrl, youtubeUrl, createdAt }: NewsCardProps) {
  const excerpt = content ? content.slice(0, 100) + (content.length > 100 ? "..." : "") : "";
  const date = new Date(createdAt).toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" });

  const cardContent = (
    <div className="group card overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
      <div className="relative aspect-video bg-gradient-to-br from-primary/10 via-surface-muted to-secondary/10 flex items-center justify-center overflow-hidden">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <Newspaper className="w-10 h-10 text-primary/30" />
        )}
        {type === "YOUTUBE" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <span className="w-14 h-14 rounded-full bg-white/95 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Play className="w-6 h-6 text-accent fill-accent ms-0.5" />
            </span>
          </div>
        )}
        <span className={`absolute top-3 right-3 text-[11px] font-bold px-2.5 py-1 rounded-pill ${type === "YOUTUBE" ? "bg-accent text-white" : "bg-white/95 text-primary"}`}>
          {type === "YOUTUBE" ? "فيديو" : "مقال"}
        </span>
      </div>
      <div className="p-5 text-right flex-1 flex flex-col">
        <h3 className="font-bold text-gray-900 leading-relaxed group-hover:text-primary transition-colors">{title}</h3>
        {excerpt && <p className="mt-2 text-sm text-gray-500 leading-relaxed">{excerpt}</p>}
        <div className="mt-auto pt-4 flex items-center gap-1.5 text-xs text-gray-400">
          <CalendarDays className="w-3.5 h-3.5" />
          <span>{date}</span>
        </div>
      </div>
    </div>
  );

  if (type === "YOUTUBE" && youtubeUrl) {
    return (
      <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
        {cardContent}
      </a>
    );
  }

  return (
    <Link href={`/news/${id}`} className="block h-full">
      {cardContent}
    </Link>
  );
}
