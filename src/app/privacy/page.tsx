export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl font-semibold text-foreground">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-foreground/50">Last updated: July 2026</p>

      <div className="mt-8 flex flex-col gap-6 text-sm leading-relaxed text-foreground/70">
        <section>
          <h2 className="mb-2 font-display text-lg font-semibold text-foreground">
            Information we collect
          </h2>
          <p>
            When you create an account, list a property, or make a booking, we
            collect your name, email, phone number, and payment details
            necessary to process your request. We also collect basic usage data
            to improve our service.
          </p>
        </section>
        <section>
          <h2 className="mb-2 font-display text-lg font-semibold text-foreground">
            How we use your information
          </h2>
          <p>
            Your data is used to facilitate bookings, verify host and guest
            identities, send booking confirmations, and provide customer
            support. We never sell your personal information to third parties.
          </p>
        </section>
        <section>
          <h2 className="mb-2 font-display text-lg font-semibold text-foreground">
            Data security
          </h2>
          <p>
            We use industry-standard encryption to protect your data in transit
            and at rest. Payment information is processed securely and is never
            stored on our servers in full.
          </p>
        </section>
        <section>
          <h2 className="mb-2 font-display text-lg font-semibold text-foreground">
            Your rights
          </h2>
          <p>
            You can request a copy of your data, ask us to correct inaccuracies,
            or request account deletion at any time by contacting
            support@nestfind.com.
          </p>
        </section>
      </div>
    </div>
  );
}
