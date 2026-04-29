"use client";

import { useState, useMemo } from "react";
import { AV_SERVICES, filterServices } from "@/lib/av-services";

interface StepServiceProps {
  description: string;
  invoiceFor: string;
  onChangeDescription: (value: string) => void;
  onChangeInvoiceFor: (value: string) => void;
  onNext: () => void;
}

export function StepService({
  description,
  invoiceFor,
  onChangeDescription,
  onChangeInvoiceFor,
  onNext,
}: StepServiceProps) {
  const [query, setQuery] = useState("");

  const filteredServices = useMemo(() => filterServices(query), [query]);

  const handleSelect = (label: string) => {
    onChangeDescription(label);
    setQuery("");
  };

  return (
    <div className="animate-slide-in space-y-6">
      <div>
        <label className="block text-sm text-muted mb-2">
          Pick a service or type your own:
        </label>
        <div className="flex flex-wrap gap-2 mb-3">
          {(query ? filteredServices : AV_SERVICES.slice(0, 12)).map((svc) => (
            <button
              key={svc.label}
              type="button"
              onClick={() => handleSelect(svc.label)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                ${
                  description === svc.label
                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                    : "bg-card border border-card-border text-foreground hover:border-primary hover:text-primary"
                }`}
            >
              {svc.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={query || (description && !AV_SERVICES.some(s => s.label === description) ? description : "")}
            onChange={(e) => {
              setQuery(e.target.value);
              if (!AV_SERVICES.some(s => s.label === e.target.value)) {
                onChangeDescription(e.target.value);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && query.trim()) {
                onChangeDescription(query.trim());
                setQuery("");
              }
            }}
            placeholder="Or type a custom service..."
            className="flex-1 px-4 py-2.5 rounded-lg bg-card border border-card-border text-foreground placeholder:text-muted focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-muted mb-1.5">
          Event / Project Name{" "}
          <span className="text-muted/60">(optional)</span>
        </label>
        <input
          type="text"
          value={invoiceFor}
          onChange={(e) => onChangeInvoiceFor(e.target.value)}
          placeholder="e.g. Corporate Gala, Music Festival, Wedding"
          className="w-full px-4 py-2.5 rounded-lg bg-card border border-card-border text-foreground placeholder:text-muted focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      <button
        onClick={onNext}
        disabled={!description.trim()}
        className="w-full py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
      >
        Next
      </button>
    </div>
  );
}
