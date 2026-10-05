import { FileBadge2, Ban, Download, History } from "lucide-react";

type Status = "DRAFT" | "AWAITING_PAYMENT" | "PAID" | "UNDER_REVIEW" | "ISSUED" | "COMPLETED" | "REJECTED";

interface CertificateCardProps {
  title: string;
  date: string;
  number: string;
  price: string;
  status: Status;
}

const statusConfig: Record<Status, { icon: typeof History; label: string; chip: string }> = {
  DRAFT: { icon: History, label: "مسودة", chip: "bg-gray-100 text-gray-600" },
  AWAITING_PAYMENT: { icon: History, label: "في انتظار الدفع", chip: "bg-yellow-100 text-yellow-700" },
  PAID: { icon: History, label: "تم الدفع", chip: "bg-blue-100 text-blue-700" },
  UNDER_REVIEW: { icon: History, label: "قيد المراجعة", chip: "bg-orange-100 text-orange-700" },
  ISSUED: { icon: Download, label: "تم الإصدار", chip: "bg-primary text-white" },
  COMPLETED: { icon: Download, label: "مكتمل", chip: "bg-primary text-white" },
  REJECTED: { icon: Ban, label: "مرفوض", chip: "bg-red-100 text-red-600" },
};

export default function CertificateCard({ title, date, number, price, status }: CertificateCardProps) {
  const config = statusConfig[status] ?? statusConfig.DRAFT;
  const StatusIcon = config.icon;

  return (
    <div className="card p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
          <FileBadge2 className="w-5 h-5 text-primary" />
        </div>
        <div className="text-right flex-1 min-w-0">
          <div className="font-bold text-gray-900 leading-snug">{title}</div>
          <div className="text-xs text-gray-400 mt-1">{date}</div>
        </div>
      </div>

      <span className={`mt-4 inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-pill ${config.chip}`}>
        <StatusIcon className="w-3.5 h-3.5" />
        {config.label}
      </span>

      <div className="mt-4 pt-4 border-t border-dashed border-gray-200 flex items-center justify-between text-sm">
        <span className="text-gray-500">
          السعر: <span className="font-bold text-gray-900">{price}</span>
        </span>
        <span className="text-gray-500">
          رقم: <span className="font-bold text-gray-900 font-mono">{number}</span>
        </span>
      </div>
    </div>
  );
}
