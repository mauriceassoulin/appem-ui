import Image from "next/image";
import Link from "next/link";

const cards = [
  {
    title: "Components",
    description: "Explore reusable UI components built for APPEM products.",
    href: "/components",
  },
  {
    title: "Blocks",
    description: "Pre-composed layouts and page sections ready to use.",
    href: "/blocks",
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-24">
      <Image
        src="/brand/logo.jpg"
        alt="APPEM Logo"
        width={80}
        height={80}
        className="rounded-2xl"
        priority
      />

      <h1 className="mt-8 text-5xl font-display tracking-tight">
        <span className="gradient-text">APPEM UI</span>
      </h1>

      <p className="mt-4 text-lg text-ink-500 font-body text-center max-w-md">
        Component Library &amp; Design System
      </p>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 w-full max-w-2xl">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group rounded-xl border border-ink-200 bg-white p-6 transition-all hover:border-brand-300 hover:shadow-md"
          >
            <h2 className="text-xl font-semibold font-display text-ink-950 group-hover:text-brand-600 transition-colors">
              {card.title}
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </h2>
            <p className="mt-2 text-sm text-ink-500">{card.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
