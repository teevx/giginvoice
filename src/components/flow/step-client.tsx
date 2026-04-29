"use client";

import { useState } from "react";
import { loadClients } from "@/lib/storage";

interface StepClientProps {
  billTo: string;
  billToAddress: string;
  onChangeBillTo: (value: string) => void;
  onChangeBillToAddress: (value: string) => void;
  onNext: () => void;
}

export function StepClient({
  billTo,
  billToAddress,
  onChangeBillTo,
  onChangeBillToAddress,
  onNext,
}: StepClientProps) {
  const [recentClients] = useState(() => loadClients());

  return (
    <div className="animate-slide-in space-y-6">
      {recentClients.length > 0 && (
        <div>
          <p className="text-sm text-muted mb-2">Recent clients:</p>
          <div className="flex flex-wrap gap-2">
            {recentClients.slice(0, 8).map((client) => (
              <button
                key={client}
                type="button"
                onClick={() => onChangeBillTo(client)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                  ${
                    billTo === client
                      ? "bg-primary text-white shadow-lg shadow-primary/25"
                      : "bg-card border border-card-border text-foreground hover:border-primary hover:text-primary"
                  }`}
              >
                {client}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-muted mb-1.5">
            Client / Company Name
          </label>
          <input
            type="text"
            value={billTo}
            onChange={(e) => onChangeBillTo(e.target.value)}
            placeholder="Who's paying?"
            className="w-full px-4 py-2.5 rounded-lg bg-card border border-card-border text-foreground placeholder:text-muted focus:outline-none focus:border-primary transition-colors"
            autoFocus
          />
        </div>

        <div>
          <label className="block text-sm text-muted mb-1.5">
            Client Address{" "}
            <span className="text-muted/60">(optional)</span>
          </label>
          <input
            type="text"
            value={billToAddress}
            onChange={(e) => onChangeBillToAddress(e.target.value)}
            placeholder="123 Client St, City, ST 00000"
            className="w-full px-4 py-2.5 rounded-lg bg-card border border-card-border text-foreground placeholder:text-muted focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>

      <button
        onClick={onNext}
        disabled={!billTo.trim()}
        className="w-full py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
      >
        Next
      </button>
    </div>
  );
}
