import { Search } from "lucide-react";

export default function SearchInput({ placeholder }: { placeholder: string }) {
  return (
    <div className="flex items-center bg-white border border-gray-200 focus-within:border-primary/40 focus-within:shadow-lg rounded-pill shadow-sm ps-5 pe-2 py-2 gap-3 max-w-md transition-all">
      <Search className="w-4 h-4 text-gray-400 shrink-0" />
      <input type="text" placeholder={placeholder} className="bg-transparent outline-none text-sm w-full text-right py-1.5" />
      <button className="btn-primary px-5 py-2 rounded-pill text-sm font-medium shrink-0">بحث</button>
    </div>
  );
}
