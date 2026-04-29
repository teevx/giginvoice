"use client";

import { useState } from "react";
import { COMMON_RATES } from "@/lib/av-services";
import {
  calculateHours,
  calculateAmount,
  formatCurrency,
} from "@/lib/calculations";
import { getCalculationMessage } from "@/lib/personality";

interface StepRateProps {
  rate: number;
  startTime: string;
  endTime: string;
  onChange: (value: number) => void;
  onNext: () => void;
}

export function StepRate({
  rate,
  startTime,
  endTime,
  onChange,
  onNext,
}: StepRateProps) {
  const [customRate, setCustomRate] = useState("");
  const hours = calculateHours(startTime, endTime);
  const amount = calculateAmount(hours, rate);

  return (
    <div className="animate-slide-in space-y-6">
      <div>
        <label className="block text-sm text-muted mb-2">
          Pick a rate or enter custom:
        </label>
        <div className="flex flex-wrap gap-2 mb-3">
          {COMMON_RATES.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => {
                onChange(r);
                setCustomRate("");
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                ${
                  rate === r
                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                    : "bg-card border border-card-border text-foreground hover:border-primary hover:text-primary"
                }`}
            >
              ${r}/hr
            </button>
          ))}
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-muted">$</span>
          <input
            type="number"
            value={customRate}
            onChange={(e) => {
              setCustomRate(e.target.value);
              const val = parseFloat(e.target.value);
              if (!isNaN(val) && val > 0) onChange(val);
            }}
            placeholder="Custom rate"
            min="0"
            step="0.01"
            className="flex-1 px-4 py-2.5 rounded-lg bg-card border border-card-border text-foreground placeholder:text-muted focus:outline-none focus:border-primary transition-colors"
          />
          <span className="text-muted">/hr</span>
        </div>
      </div>

      {rate > 0 && hours > 0 && (
        <div className="animate-fade-in bg-card border border-success/30 rounded-lg p-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-muted">
              {hours} hrs × {formatCurrency(rate)}
            </span>
            <span className="text-2xl font-bold text-success">
              {formatCurrency(amount)}
            </span>
          </div>
          <p className="text-sm text-muted italic">
            {getCalculationMessage(hours, rate, amount)}
          </p>
        </div>
      )}

      <button
        onClick={onNext}
        disabled={rate <= 0}
        className="w-full py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
      >
        Next
      </button>
    </div>
  );
}
