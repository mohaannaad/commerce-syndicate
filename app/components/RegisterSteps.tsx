import { Check } from "lucide-react";

interface RegisterStepsProps {
  steps: string[];
  current: number;
  onStepClick?: (step: number) => void;
}

export default function RegisterSteps({ steps, current, onStepClick }: RegisterStepsProps) {
  return (
    <div className="flex items-start justify-center gap-1 sm:gap-2 mb-10">
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const isDone = stepNum < current;
        const isActive = stepNum === current;
        const isClickable = stepNum < current && onStepClick;

        return (
          <div key={label} className="flex items-start gap-1 sm:gap-2">
            {i !== 0 && (
              <div className="w-5 sm:w-14 h-1 mt-5 rounded-full bg-gray-200 overflow-hidden">
                <div className={`h-full bg-gradient-to-l from-primary to-secondary transition-all duration-500 ${stepNum <= current ? "w-full" : "w-0"}`} />
              </div>
            )}
            <div className="flex flex-col items-center gap-2 w-14 sm:w-20">
              <button
                type="button"
                disabled={!isClickable}
                onClick={() => isClickable && onStepClick?.(stepNum)}
                className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-sm shrink-0 transition-all ${
                  isActive ? "btn-primary ring-4 ring-primary/15" : isDone ? "bg-primary/10 text-primary" : "bg-white border border-gray-200 text-gray-400"
                } ${isClickable ? "cursor-pointer hover:scale-110" : "cursor-default"}`}
              >
                {isDone ? <Check className="w-5 h-5" /> : stepNum}
              </button>
              <span className={`text-[10px] sm:text-xs text-center ${isActive ? "text-primary font-bold" : "text-gray-500"}`}>{label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
