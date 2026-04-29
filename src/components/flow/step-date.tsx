"use client";

import { getTodayString } from "@/lib/invoice-defaults";

interface StepDateProps {
  serviceDate: string;
  onChange: (value: string) => void;
  onNext: () => void;
}

export function StepDate({ serviceDate, onChange, onNext }: StepDateProps) {
  return (
    <div className="animate-slide-in space-y-6">
      <div>
        <label className="block text-sm text-muted mb-1.5">Date of Work</label>
        <input
          type="date"
          value={serviceDate}
          onChange={(e) => onChange(e.target.value)}
          max={getTodayString()}
          className="w-full px-4 py-2.5 rounded-lg bg-card border border-card-border text-foreground focus:outline-none focus:border-primary transition-colors [color-scheme:dark]"
          autoFocus
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onChange(getTodayString())}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
            ${
              serviceDate === getTodayString()
                ? "bg-primary text-white"
                : "bg-card border border-card-border text-foreground hover:border-primary hover:text-primary"
            }`}
        >
          Today
        </button>
        <button
          type="button"
          onClick={() => {
            const d = new Date();
            d.setDate(d.getDate() - 1);
            const val = d.toISOString().split("T")[0];
            onChange(val);
          }}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 bg-card border border-card-border text-foreground hover:border-primary hover:text-primary`}
        >
          Yesterday
        </button>
      </div>

      <button
        onClick={onNext}
        disabled={!serviceDate}
        className="w-full py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
      >
        Next
      </button>
    </div>
  );
}
