export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl font-semibold text-foreground">
        Terms of Service
      </h1>
      <p className="mt-2 text-sm text-foreground/50">Last updated: July 2026</p>

      <div className="mt-8 flex flex-col gap-6 text-sm leading-relaxed text-foreground/70">
        <section>
          <h2 className="mb-2 font-display text-lg font-semibold text-foreground">
            Using NestFind
          </h2>
          <p>
            By creating an account, you agree to provide accurate information
            and use the platform only for legitimate rental purposes. Listings
            must accurately represent the property being offered.
          </p>
        </section>
        <section>
          <h2 className="mb-2 font-display text-lg font-semibold text-foreground">
            Bookings and payments
          </h2>
          <p>
            All bookings made through NestFind are subject to the cancellation
            policy set by the individual host, shown on each listing page before
            checkout. Service fees are non-refundable once a booking is
            confirmed.
          </p>
        </section>
        <section>
          <h2 className="mb-2 font-display text-lg font-semibold text-foreground">
            Host responsibilities
          </h2>
          <p>
            Hosts are responsible for maintaining accurate availability,
            honoring confirmed bookings, and ensuring listed properties meet
            basic safety standards.
          </p>
        </section>
        <section>
          <h2 className="mb-2 font-display text-lg font-semibold text-foreground">
            Limitation of liability
          </h2>
          <p>
            NestFind acts as a marketplace connecting renters and hosts. We are
            not liable for disputes arising from the condition of a property or
            the conduct of a guest or host, though we offer mediation support in
            all cases.
          </p>
        </section>
      </div>
    </div>
  );
}
