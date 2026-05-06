"use client";

import { useState, useMemo } from "react";

interface ChipSelectProps {
  options: string[];
  onSelect: (value: string) => void;
  allowCustom?: boolean;
  placeholder?: string;
  selected?: string;
}

export function ChipSelect({
  options,
  onSelect,
  allowCustom = true,
  placeholder = "Or type your own...",
  selected,
}: ChipSelectProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return options;
    const lower = query.toLowerCase();
    return options.filter((o) => o.toLowerCase().includes(lower));
  }, [options, query]);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {filtered.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => {
              onSelect(option);
              setQuery("");
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
              ${
                selected === option
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "bg-card border border-card-border text-foreground hover:border-primary hover:text-primary"
              }`}
          >
            {option}
          </button>
        ))}
      </div>
      {allowCustom && (
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && query.trim()) {
                onSelect(query.trim());
                setQuery("");
              }
            }}
            placeholder={placeholder}
            className="flex-1 px-4 py-2.5 rounded-lg bg-card border border-card-border text-foreground placeholder:text-muted focus:outline-none focus:border-primary transition-colors"
          />
          {query.trim() && (
            <button
              type="button"
              onClick={() => {
                onSelect(query.trim());
                setQuery("");
              }}
              className="px-4 py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-primary-hover transition-colors"
            >
              Add
            </button>
          )}
        </div>
      )}
    </div>
  );
}
