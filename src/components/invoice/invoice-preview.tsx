"use client";

import { Invoice, CompanyProfile } from "@/lib/types";
import { formatCurrency, formatTime } from "@/lib/calculations";
import { formatDateDisplay, generateFileName } from "@/lib/invoice-defaults";
import { getCompletionMessageDefault } from "@/lib/personality";
import { useState, useMemo } from "react";
import dynamic from "next/dynamic";

const PdfDownloadButton = dynamic(
  () => import("./pdf-download-button").then((mod) => mod.PdfDownloadButton),
  { ssr: false, loading: () => <div className="py-3 text-center text-muted animate-pulse-gentle">Preparing PDF...</div> },
);

interface InvoicePreviewProps {
  invoice: Invoice;
  profile: CompanyProfile;
}

export function InvoicePreview({ invoice, profile }: InvoicePreviewProps) {
  const [completionMsg] = useState(() => getCompletionMessageDefault());
  const fileName = useMemo(
    () =>
      generateFileName(
        profile.companyName,
        invoice.invoiceNumber,
        invoice.date,
      ),
    [profile.companyName, invoice.invoiceNumber, invoice.date],
  );

  return (
    <div className="animate-slide-in space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">{completionMsg}</h2>
        <p className="text-muted text-sm">Preview your invoice below</p>
      </div>

      {/* Invoice preview card */}
      <div className="bg-white text-gray-900 rounded-xl p-6 sm:p-8 shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {profile.companyName || "Your Company"}
            </h3>
            <p className="text-sm text-gray-600">{profile.contactName}</p>
            {profile.address && (
              <p className="text-sm text-gray-600">{profile.address}</p>
            )}
            {(profile.city || profile.state || profile.zip) && (
              <p className="text-sm text-gray-600">
                {[profile.city, profile.state].filter(Boolean).join(", ")}{" "}
                {profile.zip}
              </p>
            )}
            {profile.phone && (
              <p className="text-sm text-gray-600">{profile.phone}</p>
            )}
            {profile.email && (
              <p className="text-sm text-gray-600">{profile.email}</p>
            )}
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-bold text-gray-400 uppercase tracking-wider">
              Invoice
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              #{invoice.invoiceNumber}
            </p>
            <p className="text-sm text-gray-600">
              {formatDateDisplay(invoice.date)}
            </p>
            {invoice.invoiceFor && (
              <p className="text-sm text-gray-600 mt-1">
                For: {invoice.invoiceFor}
              </p>
            )}
          </div>
        </div>

        {/* Bill To */}
        <div className="mb-6 pb-4 border-b border-gray-200">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
            Bill To
          </p>
          <p className="font-medium text-gray-900">{invoice.billTo}</p>
          {invoice.billToAddress && (
            <p className="text-sm text-gray-600">{invoice.billToAddress}</p>
          )}
        </div>

        {/* Line items table */}
        <table className="w-full mb-6">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left text-xs text-gray-400 uppercase tracking-wider py-2">
                Description
              </th>
              <th className="text-left text-xs text-gray-400 uppercase tracking-wider py-2">
                Date
              </th>
              <th className="text-right text-xs text-gray-400 uppercase tracking-wider py-2">
                Hours
              </th>
              <th className="text-right text-xs text-gray-400 uppercase tracking-wider py-2">
                Rate
              </th>
              <th className="text-right text-xs text-gray-400 uppercase tracking-wider py-2">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {invoice.lineItems.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-100"
              >
                <td className="py-3 text-sm">
                  {item.description}
                  {item.startTime && item.endTime && (
                    <span className="block text-xs text-gray-400">
                      {formatTime(item.startTime)} – {formatTime(item.endTime)}
                    </span>
                  )}
                </td>
                <td className="py-3 text-sm text-gray-600">
                  {formatDateDisplay(item.serviceDate)}
                </td>
                <td className="py-3 text-sm text-right">{item.hours}</td>
                <td className="py-3 text-sm text-right">
                  {formatCurrency(item.rate)}
                </td>
                <td className="py-3 text-sm text-right font-medium">
                  {formatCurrency(item.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total */}
        <div className="flex justify-end">
          <div className="w-48">
            <div className="flex justify-between py-2 border-t-2 border-gray-900">
              <span className="font-bold text-gray-900">Total</span>
              <span className="font-bold text-gray-900">
                {formatCurrency(invoice.total)}
              </span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {invoice.notes && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
              Notes
            </p>
            <p className="text-sm text-gray-600 whitespace-pre-line">
              {invoice.notes}
            </p>
          </div>
        )}
      </div>

      {/* Download button */}
      <PdfDownloadButton
        invoice={invoice}
        profile={profile}
        fileName={fileName}
      />
    </div>
  );
}
