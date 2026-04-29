"use client";

import { calculateHours } from "@/lib/calculations";

interface StepTimeProps {
  startTime: string;
  endTime: string;
  onChangeStart: (value: string) => void;
  onChangeEnd: (value: string) => void;
  onNext: () => void;
}

export function StepTime({
  startTime,
  endTime,
  onChangeStart,
  onChangeEnd,
  onNext,
}: StepTimeProps) {
  const hours =
    startTime && endTime ? calculateHours(startTime, endTime) : 0;

  return (
    <div className="animate-slide-in space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-muted mb-1.5">Start Time</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => onChangeStart(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg bg-card border border-card-border text-foreground focus:outline-none focus:border-primary transition-colors [color-scheme:dark]"
            autoFocus
          />
        </div>
        <div>
          <label className="block text-sm text-muted mb-1.5">End Time</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => onChangeEnd(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg bg-card border border-card-border text-foreground focus:outline-none focus:border-primary transition-colors [color-scheme:dark]"
          />
        </div>
      </div>

      {hours > 0 && (
        <div className="animate-fade-in bg-card border border-card-border rounded-lg p-4 text-center">
          <span className="text-2xl font-bold text-primary">{hours}</span>
          <span className="text-muted ml-2">
            {hours === 1 ? "hour" : "hours"}
          </span>
        </div>
      )}

      <button
        onClick={onNext}
        disabled={hours <= 0}
        className="w-full py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
      >
        Next
      </button>
    </div>
  );
}
