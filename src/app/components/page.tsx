import Link from "next/link";

const sections = [
  {
    title: "Primitives",
    href: "/components/primitives",
    count: 15,
    description: "Core building blocks — buttons, inputs, badges, cards, and more.",
  },
  {
    title: "Data Components",
    href: "/components/data",
    count: 7,
    description: "Tables, search, pagination, modals, dropdowns, and form rendering.",
  },
  {
    title: "Blocks & Layouts",
    href: "/components/blocks",
    count: 10,
    description: "Pre-composed page sections — tab nav, filters, forms, and page skeletons.",
  },
];

export default function ComponentsIndex() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="font-display text-4xl text-ink-950">Components</h1>
      <p className="mt-3 text-ink-500">
        Browse all 32 components organized by category.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group rounded-xl border border-ink-200 bg-white p-6 transition-all hover:border-brand-300 hover:shadow-md"
          >
            <div className="flex items-baseline justify-between">
              <h2 className="font-display text-xl text-ink-950 group-hover:text-brand-600 transition-colors">
                {s.title}
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                  &rarr;
                </span>
              </h2>
              <span className="font-mono text-sm text-ink-400">{s.count}</span>
            </div>
            <p className="mt-2 text-sm text-ink-500">{s.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
