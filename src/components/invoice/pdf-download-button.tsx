"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { Invoice, CompanyProfile } from "@/lib/types";
import { InvoicePdfDocument } from "./pdf-document";

interface PdfDownloadButtonProps {
  invoice: Invoice;
  profile: CompanyProfile;
  fileName: string;
}

export function PdfDownloadButton({
  invoice,
  profile,
  fileName,
}: PdfDownloadButtonProps) {
  return (
    <PDFDownloadLink
      document={<InvoicePdfDocument invoice={invoice} profile={profile} />}
      fileName={fileName}
      className="block w-full py-4 rounded-lg bg-success text-white text-center font-bold text-lg hover:opacity-90 transition-opacity"
    >
      {({ loading }) =>
        loading ? "Generating PDF..." : "Download Invoice PDF"
      }
    </PDFDownloadLink>
  );
}
