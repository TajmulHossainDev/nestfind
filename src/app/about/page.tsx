import { FiTarget, FiUsers, FiShield } from "react-icons/fi";

const values = [
  {
    icon: FiTarget,
    title: "Transparency first",
    description:
      "Every listing shows real photos, honest pricing, and clear house rules — no hidden fees at checkout.",
  },
  {
    icon: FiUsers,
    title: "Community-driven",
    description:
      "Reviews come only from verified guests who've actually stayed, so you can trust what you read.",
  },
  {
    icon: FiShield,
    title: "Verified hosts",
    description:
      "Every host completes identity verification before their first listing goes live.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <h1 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
          About NestFind
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-foreground/70">
          NestFind started in 2025 with a simple goal: make finding a room,
          apartment, or house in Bangladesh as easy as booking a hotel. We
          connect renters directly with verified hosts across 12 cities,
          removing the guesswork, middlemen, and hidden costs that usually come
          with rental hunting.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {values.map((v) => (
          <div
            key={v.title}
            className="rounded-2xl border border-foreground/10 p-6 text-center"
          >
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-xl text-accent">
              <v.icon />
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
              {v.title}
            </h3>
            <p className="mt-2 text-sm text-foreground/70">{v.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-2xl bg-accent/5 p-8 text-center">
        <h2 className="font-display text-xl font-semibold text-foreground">
          Our mission
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-foreground/70">
          To build the most trusted rental marketplace in Bangladesh, where
          every renter finds a place that feels like home and every host finds
          guests who treat their property with respect.
        </p>
      </div>
    </div>
  );
}
