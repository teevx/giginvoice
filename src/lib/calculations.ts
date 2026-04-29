export function parseTime(timeStr: string): number {
  const cleaned = timeStr.trim().toLowerCase();

  const match12 = cleaned.match(/^(\d{1,2}):(\d{2})\s*(am|pm)$/);
  if (match12) {
    let hours = parseInt(match12[1], 10);
    const minutes = parseInt(match12[2], 10);
    const period = match12[3];
    if (period === "pm" && hours !== 12) hours += 12;
    if (period === "am" && hours === 12) hours = 0;
    return hours * 60 + minutes;
  }

  const match24 = cleaned.match(/^(\d{1,2}):(\d{2})$/);
  if (match24) {
    const hours = parseInt(match24[1], 10);
    const minutes = parseInt(match24[2], 10);
    return hours * 60 + minutes;
  }

  return 0;
}

export function calculateHours(startTime: string, endTime: string): number {
  const startMinutes = parseTime(startTime);
  const endMinutes = parseTime(endTime);

  if (startMinutes === 0 && endMinutes === 0) return 0;

  let diff = endMinutes - startMinutes;
  if (diff < 0) diff += 24 * 60;

  const hours = diff / 60;
  return Math.round(hours * 4) / 4;
}

export function calculateAmount(hours: number, rate: number): number {
  return Math.round(hours * rate * 100) / 100;
}

export function calculateTotals(lineItems: { amount: number }[]): {
  subtotal: number;
  total: number;
} {
  const subtotal = lineItems.reduce((sum, item) => sum + item.amount, 0);
  return {
    subtotal: Math.round(subtotal * 100) / 100,
    total: Math.round(subtotal * 100) / 100,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatTime(time24: string): string {
  const [hoursStr, minutesStr] = time24.split(":");
  let hours = parseInt(hoursStr, 10);
  const minutes = minutesStr || "00";
  const period = hours >= 12 ? "PM" : "AM";
  if (hours > 12) hours -= 12;
  if (hours === 0) hours = 12;
  return `${hours}:${minutes} ${period}`;
}
