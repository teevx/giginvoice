"use client";

import { useState, useCallback, useMemo } from "react";
import { CompanyProfile, Invoice, LineItem, FlowStep, FLOW_STEPS } from "@/lib/types";
import { calculateHours, calculateAmount, calculateTotals } from "@/lib/calculations";
import { getStepMessage } from "@/lib/personality";
import { saveProfile, saveClient, incrementInvoiceNumber } from "@/lib/storage";
import { getDefaultInvoice, createEmptyLineItem } from "@/lib/invoice-defaults";
import { StepCompany } from "./step-company";
import { StepClient } from "./step-client";
import { StepService } from "./step-service";
import { StepDate } from "./step-date";
import { StepTime } from "./step-time";
import { StepRate } from "./step-rate";
import { StepAddMore } from "./step-add-more";
import { StepNotes } from "./step-notes";
import { InvoicePreview } from "../invoice/invoice-preview";

const emptyProfile: CompanyProfile = {
  companyName: "",
  contactName: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  phone: "",
  email: "",
};

export function FlowContainer() {
  const [step, setStep] = useState<FlowStep>("company");
  const [profile, setProfile] = useState<CompanyProfile>(emptyProfile);
  const [invoice, setInvoice] = useState<Invoice>(getDefaultInvoice);
  const [currentItem, setCurrentItem] = useState<LineItem>(createEmptyLineItem);
  const [stepMessage, setStepMessage] = useState(() => getStepMessage("company"));

  const stepIndex = FLOW_STEPS.indexOf(step);
  const progress = ((stepIndex + 1) / FLOW_STEPS.length) * 100;

  const goToStep = useCallback((nextStep: FlowStep) => {
    setStepMessage(getStepMessage(nextStep));
    setStep(nextStep);
  }, []);

  const finalizeCurrentItem = useCallback(() => {
    const hours = calculateHours(currentItem.startTime, currentItem.endTime);
    const amount = calculateAmount(hours, currentItem.rate);
    const finalized: LineItem = {
      ...currentItem,
      hours,
      amount,
    };
    setInvoice((prev) => {
      const newItems = [...prev.lineItems, finalized];
      const totals = calculateTotals(newItems);
      return { ...prev, lineItems: newItems, ...totals };
    });
    setCurrentItem(createEmptyLineItem());
  }, [currentItem]);

  const removeLineItem = useCallback((id: string) => {
    setInvoice((prev) => {
      const newItems = prev.lineItems.filter((li) => li.id !== id);
      const totals = calculateTotals(newItems);
      return { ...prev, lineItems: newItems, ...totals };
    });
  }, []);

  const handleCompanyNext = useCallback(() => {
    saveProfile(profile);
    goToStep("client");
  }, [profile, goToStep]);

  const handleClientNext = useCallback(() => {
    if (invoice.billTo.trim()) {
      saveClient(invoice.billTo.trim());
    }
    goToStep("service");
  }, [invoice.billTo, goToStep]);

  const handleServiceNext = useCallback(() => {
    goToStep("date");
  }, [goToStep]);

  const handleDateNext = useCallback(() => {
    goToStep("time");
  }, [goToStep]);

  const handleTimeNext = useCallback(() => {
    goToStep("rate");
  }, [goToStep]);

  const handleRateNext = useCallback(() => {
    finalizeCurrentItem();
    goToStep("add-more");
  }, [finalizeCurrentItem, goToStep]);

  const handleAddMore = useCallback(() => {
    goToStep("service");
  }, [goToStep]);

  const handleAllDone = useCallback(() => {
    goToStep("notes");
  }, [goToStep]);

  const handleNotesNext = useCallback(() => {
    incrementInvoiceNumber();
    goToStep("preview");
  }, [goToStep]);

  const completedInvoice = useMemo(() => invoice, [invoice]);

  return (
    <div className="min-h-screen bg-background">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-card">
        <div
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-16 pb-24">
        {/* Step header */}
        {step !== "preview" && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">{stepMessage}</h2>
            <p className="text-sm text-muted">
              Step {stepIndex + 1} of {FLOW_STEPS.length}
            </p>
          </div>
        )}

        {/* Step content */}
        {step === "company" && (
          <StepCompany
            profile={profile}
            onChange={setProfile}
            onNext={handleCompanyNext}
          />
        )}

        {step === "client" && (
          <StepClient
            billTo={invoice.billTo}
            billToAddress={invoice.billToAddress}
            onChangeBillTo={(v) =>
              setInvoice((prev) => ({ ...prev, billTo: v }))
            }
            onChangeBillToAddress={(v) =>
              setInvoice((prev) => ({ ...prev, billToAddress: v }))
            }
            onNext={handleClientNext}
          />
        )}

        {step === "service" && (
          <StepService
            description={currentItem.description}
            invoiceFor={invoice.invoiceFor}
            onChangeDescription={(v) =>
              setCurrentItem((prev) => ({ ...prev, description: v }))
            }
            onChangeInvoiceFor={(v) =>
              setInvoice((prev) => ({ ...prev, invoiceFor: v }))
            }
            onNext={handleServiceNext}
          />
        )}

        {step === "date" && (
          <StepDate
            serviceDate={currentItem.serviceDate}
            onChange={(v) =>
              setCurrentItem((prev) => ({ ...prev, serviceDate: v }))
            }
            onNext={handleDateNext}
          />
        )}

        {step === "time" && (
          <StepTime
            startTime={currentItem.startTime}
            endTime={currentItem.endTime}
            onChangeStart={(v) =>
              setCurrentItem((prev) => ({ ...prev, startTime: v }))
            }
            onChangeEnd={(v) =>
              setCurrentItem((prev) => ({ ...prev, endTime: v }))
            }
            onNext={handleTimeNext}
          />
        )}

        {step === "rate" && (
          <StepRate
            rate={currentItem.rate}
            startTime={currentItem.startTime}
            endTime={currentItem.endTime}
            onChange={(v) =>
              setCurrentItem((prev) => ({ ...prev, rate: v }))
            }
            onNext={handleRateNext}
          />
        )}

        {step === "add-more" && (
          <StepAddMore
            lineItems={invoice.lineItems}
            onAddMore={handleAddMore}
            onDone={handleAllDone}
            onRemoveItem={removeLineItem}
          />
        )}

        {step === "notes" && (
          <StepNotes
            notes={invoice.notes}
            onChange={(v) =>
              setInvoice((prev) => ({ ...prev, notes: v }))
            }
            onNext={handleNotesNext}
          />
        )}

        {step === "preview" && (
          <InvoicePreview invoice={completedInvoice} profile={profile} />
        )}

        {/* Back button */}
        {stepIndex > 0 && step !== "preview" && (
          <button
            type="button"
            onClick={() => {
              const prevStep = FLOW_STEPS[stepIndex - 1];
              goToStep(prevStep);
            }}
            className="mt-4 text-sm text-muted hover:text-foreground transition-colors"
          >
            ← Back
          </button>
        )}
      </div>
    </div>
  );
}
