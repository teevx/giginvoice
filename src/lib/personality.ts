function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const stepMessages: Record<string, string[]> = {
  company: [
    "First things first — who are you?",
    "Let's set you up. Who's sending this invoice?",
    "Tell us about your business real quick.",
  ],
  client: [
    "Alright, who owes you money?",
    "Now the important part — who's paying?",
    "Time to name names. Who's the client?",
  ],
  service: [
    "What'd you do for them?",
    "What was the gig?",
    "What kind of work are we billing for?",
  ],
  date: [
    "When was the gig?",
    "What day did this go down?",
    "When'd you work?",
  ],
  time: [
    "What time did you roll in and bounce?",
    "Clock in, clock out — what were the hours?",
    "When did you start and finish?",
  ],
  rate: [
    "What's the rate?",
    "How much are you charging?",
    "What's the hourly damage?",
  ],
  "add-more": [
    "Got more work on this gig? Let's stack it up.",
    "Any more line items to add?",
    "More services to bill for?",
  ],
  notes: [
    "Any notes for the client?",
    "Want to add a personal touch?",
    "Anything else they should know?",
  ],
  preview: [
    "Your invoice is locked and loaded.",
    "Looking good. Time to get paid.",
    "Invoice ready. Go get your money.",
  ],
};

export function getStepMessage(step: string): string {
  const messages = stepMessages[step];
  if (!messages) return "";
  return pick(messages);
}

export function getCalculationMessage(
  hours: number,
  rate: number,
  amount: number,
): string {
  const messages = [
    `${hours} hours × $${rate} = $${amount}. Solid.`,
    `That's ${hours} hours at $${rate}/hr — $${amount}. Not bad.`,
    `$${amount} for ${hours} hours of work. Let's get it.`,
    `${hours}hrs × $${rate} = $${amount}. Math checks out.`,
  ];
  return pick(messages);
}

export function getCompletionMessage(): string {
  const messages = [
    "Invoice ready. Go get your money.",
    "Done. That was easier than setting up a mic stand.",
    "Your invoice is in the books.",
    "All set. Time to collect.",
    "Invoice locked and loaded. Send it.",
  ];
  return pick(messages);
}

export function getReturnGreeting(companyName: string): string {
  const messages = [
    `Back already? ${companyName} must be busy.`,
    `Welcome back. Let's make ${companyName} some money.`,
    `${companyName} in the house. Let's invoice.`,
    `Hey again. Ready to bill?`,
  ];
  return pick(messages);
}

export function getLoadingMessage(): string {
  const messages = [
    "Crunching numbers faster than your accountant...",
    "Making your invoice look professional...",
    "Doing the math so you don't have to...",
    "Almost there. Patience pays... literally.",
    "Building something beautiful...",
  ];
  return pick(messages);
}

export function getNotesSuggestions(): string[] {
  return [
    "Payment due within 30 days",
    "Thank you for your business!",
    "Net 15 — please remit within 15 days",
    "Thank you for the opportunity!",
  ];
}
