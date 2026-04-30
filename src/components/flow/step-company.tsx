"use client";

import { useState } from "react";
import { CompanyProfile } from "@/lib/types";
import { loadProfile } from "@/lib/storage";
import { getReturnGreetingDefault } from "@/lib/personality";

function loadSavedProfile(): {
  saved: CompanyProfile | null;
  isReturning: boolean;
  greeting: string;
} {
  if (typeof window === "undefined") {
    return { saved: null, isReturning: false, greeting: "" };
  }
  const saved = loadProfile();
  if (saved && saved.companyName) {
    return {
      saved,
      isReturning: true,
      greeting: getReturnGreetingDefault(saved.companyName),
    };
  }
  return { saved: null, isReturning: false, greeting: "" };
}

interface StepCompanyProps {
  profile: CompanyProfile;
  onChange: (profile: CompanyProfile) => void;
  onNext: () => void;
}

export function StepCompany({ profile, onChange, onNext }: StepCompanyProps) {
  const [initial] = useState(() => {
    const result = loadSavedProfile();
    if (result.saved) {
      queueMicrotask(() => onChange(result.saved!));
    }
    return result;
  });
  const isReturning = initial.isReturning;
  const greeting = initial.greeting;

  const update = (field: keyof CompanyProfile, value: string) => {
    onChange({ ...profile, [field]: value });
  };

  const isValid =
    profile.companyName.trim() !== "" && profile.contactName.trim() !== "";

  return (
    <div className="animate-slide-in space-y-6">
      {isReturning && (
        <p className="text-muted text-sm italic">{greeting}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-sm text-muted mb-1.5">
            Company / Business Name
          </label>
          <input
            type="text"
            value={profile.companyName}
            onChange={(e) => update("companyName", e.target.value)}
            placeholder="Your business name"
            className="w-full px-4 py-2.5 rounded-lg bg-card border border-card-border text-foreground placeholder:text-muted focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm text-muted mb-1.5">Your Name</label>
          <input
            type="text"
            value={profile.contactName}
            onChange={(e) => update("contactName", e.target.value)}
            placeholder="Full name"
            className="w-full px-4 py-2.5 rounded-lg bg-card border border-card-border text-foreground placeholder:text-muted focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm text-muted mb-1.5">Address</label>
          <input
            type="text"
            value={profile.address}
            onChange={(e) => update("address", e.target.value)}
            placeholder="Street address"
            className="w-full px-4 py-2.5 rounded-lg bg-card border border-card-border text-foreground placeholder:text-muted focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm text-muted mb-1.5">City</label>
          <input
            type="text"
            value={profile.city}
            onChange={(e) => update("city", e.target.value)}
            placeholder="City"
            className="w-full px-4 py-2.5 rounded-lg bg-card border border-card-border text-foreground placeholder:text-muted focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-muted mb-1.5">State</label>
            <input
              type="text"
              value={profile.state}
              onChange={(e) => update("state", e.target.value)}
              placeholder="ST"
              className="w-full px-4 py-2.5 rounded-lg bg-card border border-card-border text-foreground placeholder:text-muted focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-muted mb-1.5">ZIP</label>
            <input
              type="text"
              value={profile.zip}
              onChange={(e) => update("zip", e.target.value)}
              placeholder="00000"
              className="w-full px-4 py-2.5 rounded-lg bg-card border border-card-border text-foreground placeholder:text-muted focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-muted mb-1.5">Phone</label>
          <input
            type="tel"
            value={profile.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="(555) 123-4567"
            className="w-full px-4 py-2.5 rounded-lg bg-card border border-card-border text-foreground placeholder:text-muted focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm text-muted mb-1.5">Email</label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@business.com"
            className="w-full px-4 py-2.5 rounded-lg bg-card border border-card-border text-foreground placeholder:text-muted focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>

      <button
        onClick={onNext}
        disabled={!isValid}
        className="w-full py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
      >
        Next
      </button>
    </div>
  );
}
