"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { Invoice, CompanyProfile } from "@/lib/types";
import { formatCurrency, formatTime } from "@/lib/calculations";
import { formatDateDisplay } from "@/lib/invoice-defaults";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#1a1a1a",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  companyName: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
  },
  contactInfo: {
    fontSize: 9,
    color: "#666",
    marginBottom: 2,
  },
  invoiceTitle: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: "#999",
    textAlign: "right",
    letterSpacing: 3,
  },
  invoiceMeta: {
    fontSize: 9,
    color: "#666",
    textAlign: "right",
    marginTop: 2,
  },
  billTo: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  billToLabel: {
    fontSize: 8,
    color: "#999",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },
  billToName: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
  },
  table: {
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 6,
    marginBottom: 4,
  },
  tableHeaderText: {
    fontSize: 8,
    color: "#999",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
    paddingVertical: 8,
  },
  colDesc: { flex: 3 },
  colDate: { flex: 2 },
  colHours: { flex: 1, textAlign: "right" },
  colRate: { flex: 1.5, textAlign: "right" },
  colAmount: { flex: 1.5, textAlign: "right" },
  timeSubtext: {
    fontSize: 8,
    color: "#999",
    marginTop: 2,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  totalBox: {
    width: 180,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 2,
    borderTopColor: "#1a1a1a",
    paddingTop: 8,
  },
  totalLabel: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
  },
  totalValue: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
  },
  notes: {
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  notesLabel: {
    fontSize: 8,
    color: "#999",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },
  notesText: {
    fontSize: 9,
    color: "#666",
    lineHeight: 1.5,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 8,
    color: "#ccc",
  },
});

interface InvoicePdfDocumentProps {
  invoice: Invoice;
  profile: CompanyProfile;
}

export function InvoicePdfDocument({
  invoice,
  profile,
}: InvoicePdfDocumentProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.companyName}>
              {profile.companyName || "Company Name"}
            </Text>
            <Text style={styles.contactInfo}>{profile.contactName}</Text>
            {profile.address ? (
              <Text style={styles.contactInfo}>{profile.address}</Text>
            ) : null}
            {profile.city || profile.state || profile.zip ? (
              <Text style={styles.contactInfo}>
                {[profile.city, profile.state].filter(Boolean).join(", ")}{" "}
                {profile.zip}
              </Text>
            ) : null}
            {profile.phone ? (
              <Text style={styles.contactInfo}>{profile.phone}</Text>
            ) : null}
            {profile.email ? (
              <Text style={styles.contactInfo}>{profile.email}</Text>
            ) : null}
          </View>
          <View>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            <Text style={styles.invoiceMeta}>#{invoice.invoiceNumber}</Text>
            <Text style={styles.invoiceMeta}>
              {formatDateDisplay(invoice.date)}
            </Text>
            {invoice.invoiceFor ? (
              <Text style={styles.invoiceMeta}>
                For: {invoice.invoiceFor}
              </Text>
            ) : null}
          </View>
        </View>

        {/* Bill To */}
        <View style={styles.billTo}>
          <Text style={styles.billToLabel}>Bill To</Text>
          <Text style={styles.billToName}>{invoice.billTo}</Text>
          {invoice.billToAddress ? (
            <Text style={styles.contactInfo}>{invoice.billToAddress}</Text>
          ) : null}
        </View>

        {/* Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <View style={styles.colDesc}>
              <Text style={styles.tableHeaderText}>Description</Text>
            </View>
            <View style={styles.colDate}>
              <Text style={styles.tableHeaderText}>Date</Text>
            </View>
            <View style={styles.colHours}>
              <Text style={[styles.tableHeaderText, { textAlign: "right" }]}>
                Hours
              </Text>
            </View>
            <View style={styles.colRate}>
              <Text style={[styles.tableHeaderText, { textAlign: "right" }]}>
                Rate
              </Text>
            </View>
            <View style={styles.colAmount}>
              <Text style={[styles.tableHeaderText, { textAlign: "right" }]}>
                Amount
              </Text>
            </View>
          </View>

          {invoice.lineItems.map((item) => (
            <View key={item.id} style={styles.tableRow}>
              <View style={styles.colDesc}>
                <Text>{item.description}</Text>
                {item.startTime && item.endTime ? (
                  <Text style={styles.timeSubtext}>
                    {formatTime(item.startTime)} – {formatTime(item.endTime)}
                  </Text>
                ) : null}
              </View>
              <View style={styles.colDate}>
                <Text>{formatDateDisplay(item.serviceDate)}</Text>
              </View>
              <View style={styles.colHours}>
                <Text style={{ textAlign: "right" }}>{item.hours}</Text>
              </View>
              <View style={styles.colRate}>
                <Text style={{ textAlign: "right" }}>
                  {formatCurrency(item.rate)}
                </Text>
              </View>
              <View style={styles.colAmount}>
                <Text
                  style={{ textAlign: "right", fontFamily: "Helvetica-Bold" }}
                >
                  {formatCurrency(item.amount)}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Total */}
        <View style={styles.totalRow}>
          <View style={styles.totalBox}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>
              {formatCurrency(invoice.total)}
            </Text>
          </View>
        </View>

        {/* Notes */}
        {invoice.notes ? (
          <View style={styles.notes}>
            <Text style={styles.notesLabel}>Notes</Text>
            <Text style={styles.notesText}>{invoice.notes}</Text>
          </View>
        ) : null}

        {/* Footer */}
        <Text style={styles.footer}>
          Generated with GigInvoice
        </Text>
      </Page>
    </Document>
  );
}
