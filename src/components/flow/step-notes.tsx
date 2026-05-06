"use client";

import { getNotesSuggestions } from "@/lib/personality";

interface StepNotesProps {
  notes: string;
  onChange: (value: string) => void;
  onNext: () => void;
}

export function StepNotes({ notes, onChange, onNext }: StepNotesProps) {
  const suggestions = getNotesSuggestions();

  return (
    <div className="animate-slide-in space-y-6">
      <div>
        <div className="flex flex-wrap gap-2 mb-3">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                const current = notes.trim();
                onChange(current ? `${current}\n${s}` : s);
              }}
              className="px-4 py-2 rounded-full text-sm font-medium bg-card border border-card-border text-foreground hover:border-primary hover:text-primary transition-all duration-200"
            >
              {s}
            </button>
          ))}
        </div>
        <textarea
          value={notes}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Any additional notes for the client..."
          rows={3}
          className="w-full px-4 py-2.5 rounded-lg bg-card border border-card-border text-foreground placeholder:text-muted focus:outline-none focus:border-primary transition-colors resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => {
            if (!notes.trim()) onChange("");
            onNext();
          }}
          className="py-3 rounded-lg bg-card border border-card-border text-muted font-semibold hover:text-foreground transition-all duration-200"
        >
          Skip
        </button>
        <button
          type="button"
          onClick={onNext}
          className="py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-hover transition-all duration-200"
        >
          Next
        </button>
      </div>
    </div>
  );
}
