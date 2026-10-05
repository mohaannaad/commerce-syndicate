import { MapPin, Navigation, User, Users, Phone, Clock } from "lucide-react";

interface BranchCardProps {
  name: string;
  address: string;
  phone: string;
  hours: string;
  representative: string;
  council: string;
}

export default function BranchCard({ name, address, phone, hours, representative, council }: BranchCardProps) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <div className="group card p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="font-bold text-gray-900">{name}</div>
            <div className="text-xs text-gray-400 mt-1">{address}</div>
          </div>
        </div>

        <a href={mapsUrl} target="_blank" rel="noopener noreferrer" title="افتح على الخريطة" className="w-10 h-10 rounded-xl bg-surface-muted text-primary group-hover:bg-primary group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
          <Navigation className="w-4 h-4" />
        </a>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-2.5 bg-surface-muted rounded-2xl p-4 text-sm">
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-secondary shrink-0" />
          <span className="font-bold text-gray-900" dir="ltr">
            {phone}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Clock className="w-4 h-4 text-secondary shrink-0" />
          {hours}
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-xs">
          <User className="w-3.5 h-3.5 text-primary shrink-0" />
          <span className="text-gray-400">ممثل عن النقابة:</span>
          <span className="text-gray-900 font-medium">{representative}</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Users className="w-3.5 h-3.5 text-primary shrink-0" />
          <span className="text-gray-400">مجلس النقابة:</span>
          <span className="text-gray-900 font-medium">{council}</span>
        </div>
      </div>
    </div>
  );
}
