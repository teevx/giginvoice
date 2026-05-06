import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <div className="text-xl font-bold">
          <span className="text-primary">Gig</span>Invoice
        </div>
        <Link
          href="/create"
          className="px-5 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-hover transition-colors"
        >
          Create Invoice
        </Link>
      </nav>

      {/* Hero */}
      <section className="px-6 pt-20 pb-24 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6">
          Invoices that don&apos;t{" "}
          <span className="text-primary">suck.</span>
        </h1>
        <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-10">
          Create professional invoices in under a minute with a guided
          conversation. Built for A/V freelancers who&apos;d rather be on set than
          doing paperwork.
        </p>
        <Link
          href="/create"
          className="inline-block px-8 py-4 rounded-xl bg-primary text-white text-lg font-bold hover:bg-primary-hover transition-all duration-200 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30"
        >
          Create Your Invoice →
        </Link>
      </section>

      {/* How it works */}
      <section className="px-6 py-20 bg-card/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            How it works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="bg-card border border-card-border rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-bold mb-2">Answer a few questions</h3>
              <p className="text-sm text-muted">
                Quick-tap chips and simple inputs. No boring forms. We&apos;ll
                walk you through it step by step.
              </p>
            </div>
            <div className="bg-card border border-card-border rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-bold mb-2">We do the math</h3>
              <p className="text-sm text-muted">
                Hours, rates, totals — all calculated automatically. No
                spreadsheets, no calculator app.
              </p>
            </div>
            <div className="bg-card border border-card-border rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-bold mb-2">Download your PDF</h3>
              <p className="text-sm text-muted">
                Professional invoice, generated instantly. Send it to your client
                and get paid.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sample invoice */}
      <section className="px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
            Clean. Professional. Done.
          </h2>
          <p className="text-muted text-center mb-10">
            Here&apos;s what your invoice will look like.
          </p>

          {/* Sample invoice card */}
          <div className="bg-white text-gray-900 rounded-xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <span className="text-6xl font-bold text-gray-200/60 rotate-[-30deg] select-none">
                SAMPLE
              </span>
            </div>

            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-bold">Your Company Name</h3>
                <p className="text-sm text-gray-500">Your Name</p>
                <p className="text-sm text-gray-500">123 Your Street</p>
                <p className="text-sm text-gray-500">
                  Your City, ST 00000
                </p>
              </div>
              <div className="text-right">
                <h2 className="text-xl font-bold text-gray-400 uppercase tracking-wider">
                  Invoice
                </h2>
                <p className="text-sm text-gray-500">#001</p>
                <p className="text-sm text-gray-500">04/28/2026</p>
              </div>
            </div>

            <div className="mb-4 pb-3 border-b border-gray-200">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                Bill To
              </p>
              <p className="font-medium">Client Company</p>
            </div>

            <table className="w-full mb-4 text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left text-xs text-gray-400 uppercase py-2">
                    Description
                  </th>
                  <th className="text-right text-xs text-gray-400 uppercase py-2">
                    Hours
                  </th>
                  <th className="text-right text-xs text-gray-400 uppercase py-2">
                    Rate
                  </th>
                  <th className="text-right text-xs text-gray-400 uppercase py-2">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2">Sound Tech — Corporate Event</td>
                  <td className="py-2 text-right">8</td>
                  <td className="py-2 text-right">$40.00</td>
                  <td className="py-2 text-right font-medium">$320.00</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2">AV Tech — Load Out</td>
                  <td className="py-2 text-right">4</td>
                  <td className="py-2 text-right">$35.00</td>
                  <td className="py-2 text-right font-medium">$140.00</td>
                </tr>
              </tbody>
            </table>

            <div className="flex justify-end">
              <div className="w-40">
                <div className="flex justify-between py-2 border-t-2 border-gray-900">
                  <span className="font-bold">Total</span>
                  <span className="font-bold">$460.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 bg-card/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            Built for freelancers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: "Conversational flow",
                desc: "Not another boring form. Answer quick questions and tap chips to build your invoice in under a minute.",
              },
              {
                title: "Auto-calculations",
                desc: "Enter your start time, end time, and rate. We handle the hours, amounts, and totals.",
              },
              {
                title: "A/V industry presets",
                desc: "Sound Tech, Lighting, Camera Op, Stage Hand — common gig types ready to tap. Or type your own.",
              },
              {
                title: "Instant PDF",
                desc: "Your invoice is generated right in the browser. No waiting, no server processing. Download instantly.",
              },
              {
                title: "Remembers you",
                desc: "Your company info and recent clients are saved locally. Next time is even faster.",
              },
              {
                title: "Works on any device",
                desc: "Phone, tablet, laptop. Install it on your home screen like a native app. Works offline too.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-card border border-card-border rounded-xl p-6"
              >
                <h3 className="font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 py-20">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Simple pricing
          </h2>
          <p className="text-muted mb-8">
            One plan. Unlimited invoices. No surprises.
          </p>
          <div className="bg-card border border-primary/30 rounded-xl p-8 shadow-lg shadow-primary/5">
            <div className="text-sm text-primary font-semibold uppercase tracking-wider mb-2">
              Pro
            </div>
            <div className="mb-4">
              <span className="text-4xl font-bold">$3.99</span>
              <span className="text-muted">/month</span>
            </div>
            <ul className="text-sm text-muted space-y-3 mb-8 text-left">
              <li className="flex items-start gap-2">
                <span className="text-success mt-0.5">•</span>
                Unlimited invoice downloads
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success mt-0.5">•</span>
                All industry categories
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success mt-0.5">•</span>
                Clean PDF — no watermarks
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success mt-0.5">•</span>
                Invoice history
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success mt-0.5">•</span>
                Priority support
              </li>
            </ul>
            <Link
              href="/create"
              className="block w-full py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-hover transition-colors"
            >
              Try It Free
            </Link>
            <p className="text-xs text-muted mt-3">
              Free preview included. Pay only when you download.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-card-border">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-muted">
          <div>
            <span className="text-primary font-bold">Gig</span>Invoice
          </div>
          <p>© {new Date().getFullYear()} GigInvoice. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
