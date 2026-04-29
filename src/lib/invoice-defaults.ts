import { Invoice, LineItem } from "./types";
import { getNextInvoiceNumber } from "./storage";
import { v4 as uuidv4 } from "uuid";

export function getTodayString(): string {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
}

export function formatDateDisplay(dateStr: string): string {
  const [year, month, day] = dateStr.split("-");
  return `${month}/${day}/${year}`;
}

export function createEmptyLineItem(): LineItem {
  return {
    id: uuidv4(),
    description: "",
    serviceDate: getTodayString(),
    startTime: "",
    endTime: "",
    hours: 0,
    rate: 0,
    amount: 0,
  };
}

export function getDefaultInvoice(): Invoice {
  return {
    invoiceNumber: getNextInvoiceNumber(),
    date: getTodayString(),
    invoiceFor: "",
    billTo: "",
    billToAddress: "",
    lineItems: [],
    notes: "",
    subtotal: 0,
    total: 0,
  };
}

export function generateFileName(
  companyName: string,
  invoiceNumber: string,
  date: string,
): string {
  const company = companyName
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 30);
  const dateFormatted = date.replace(/-/g, "_");
  return `${company}_INVOICE_${invoiceNumber}_${dateFormatted}.pdf`;
}
