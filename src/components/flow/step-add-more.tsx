"use client";

import { LineItem } from "@/lib/types";
import { formatCurrency, formatTime } from "@/lib/calculations";
import { formatDateDisplay } from "@/lib/invoice-defaults";

interface StepAddMoreProps {
  lineItems: LineItem[];
  onAddMore: () => void;
  onDone: () => void;
  onRemoveItem: (id: string) => void;
}

export function StepAddMore({
  lineItems,
  onAddMore,
  onDone,
  onRemoveItem,
}: StepAddMoreProps) {
  const total = lineItems.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="animate-slide-in space-y-6">
      <div className="space-y-3">
        {lineItems.map((item) => (
          <div
            key={item.id}
            className="bg-card border border-card-border rounded-lg p-4 flex items-start justify-between gap-3"
          >
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{item.description}</div>
              <div className="text-sm text-muted">
                {formatDateDisplay(item.serviceDate)}
                {item.startTime && item.endTime && (
                  <>
                    {" "}
                    &middot; {formatTime(item.startTime)} –{" "}
                    {formatTime(item.endTime)}
                  </>
                )}
                {" "}&middot; {item.hours}hrs × {formatCurrency(item.rate)}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold text-success whitespace-nowrap">
                {formatCurrency(item.amount)}
              </span>
              <button
                type="button"
                onClick={() => onRemoveItem(item.id)}
                className="text-muted hover:text-danger transition-colors text-lg leading-none"
                title="Remove"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center py-3 border-t border-card-border">
        <span className="text-muted font-medium">Running Total</span>
        <span className="text-xl font-bold text-success">
          {formatCurrency(total)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onAddMore}
          className="py-3 rounded-lg bg-card border border-card-border text-foreground font-semibold hover:border-primary hover:text-primary transition-all duration-200"
        >
          + Add More
        </button>
        <button
          type="button"
          onClick={onDone}
          className="py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-hover transition-all duration-200"
        >
          That&apos;s Everything
        </button>
      </div>
    </div>
  );
}
