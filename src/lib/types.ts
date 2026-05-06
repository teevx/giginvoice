export interface CompanyProfile {
  companyName: string;
  contactName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
}

export interface LineItem {
  id: string;
  description: string;
  serviceDate: string;
  startTime: string;
  endTime: string;
  hours: number;
  rate: number;
  amount: number;
}

export interface Invoice {
  invoiceNumber: string;
  date: string;
  invoiceFor: string;
  billTo: string;
  billToAddress: string;
  lineItems: LineItem[];
  notes: string;
  subtotal: number;
  total: number;
}

export type FlowStep =
  | "company"
  | "client"
  | "service"
  | "date"
  | "time"
  | "rate"
  | "add-more"
  | "notes"
  | "preview";

export const FLOW_STEPS: FlowStep[] = [
  "company",
  "client",
  "service",
  "date",
  "time",
  "rate",
  "add-more",
  "notes",
  "preview",
];
