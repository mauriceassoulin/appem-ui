import Image from "next/image";
import Link from "next/link";
import { colors } from "@/lib/tokens";

const categories = [
  {
    title: "Primitives",
    description:
      "Core building blocks — buttons, inputs, badges, cards, and more.",
    href: "/components/primitives",
    count: 15,
    components: [
      "Button",
      "Input",
      "Textarea",
      "Select",
      "Checkbox",
      "Toggle",
      "RadioGroup",
      "Badge",
      "Tag",
      "Tooltip",
      "Avatar",
      "Card",
      "Alert",
      "Separator",
      "Skeleton",
    ],
  },
  {
    title: "Data Components",
    description:
      "Tables, search, pagination, modals, dropdowns, and form rendering.",
    href: "/components/data",
    count: 7,
    components: [
      "DataTable",
      "Pagination",
      "SearchBar",
      "Modal",
      "Dropdown",
      "Breadcrumbs",
      "FormFieldRenderer",
    ],
  },
  {
    title: "Blocks & Layouts",
    description:
      "Pre-composed page sections — tab nav, filters, forms, and page skeletons.",
    href: "/components/blocks",
    count: 10,
    components: [
      "TabNav",
      "FilterPanel",
      "FormSection",
      "SubtableEditor",
      "RecordHero",
      "EditModeBar",
      "ActionDock",
      "ListingPageSkeleton",
      "FormPageSkeleton",
      "DashboardSkeleton",
    ],
  },
];

const stats = [
  { label: "Components", value: "32" },
  { label: "Field Types", value: "28" },
  { label: "Page Layouts", value: "3" },
];

const brandSwatches = [
  { shade: "50", hex: colors.brand[50] },
  { shade: "100", hex: colors.brand[100] },
  { shade: "200", hex: colors.brand[200] },
  { shade: "300", hex: colors.brand[300] },
  { shade: "400", hex: colors.brand[400] },
  { shade: "500", hex: colors.brand[500] },
  { shade: "600", hex: colors.brand[600] },
  { shade: "700", hex: colors.brand[700] },
  { shade: "800", hex: colors.brand[800] },
  { shade: "900", hex: colors.brand[900] },
  { shade: "950", hex: colors.brand[950] },
];

const inkSwatches = [
  { shade: "50", hex: colors.ink[50] },
  { shade: "100", hex: colors.ink[100] },
  { shade: "200", hex: colors.ink[200] },
  { shade: "300", hex: colors.ink[300] },
  { shade: "400", hex: colors.ink[400] },
  { shade: "500", hex: colors.ink[500] },
  { shade: "600", hex: colors.ink[600] },
  { shade: "700", hex: colors.ink[700] },
  { shade: "800", hex: colors.ink[800] },
  { shade: "900", hex: colors.ink[900] },
  { shade: "950", hex: colors.ink[950] },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      {/* Hero */}
      <div className="flex flex-col items-center text-center">
        <Image
          src="/brand/logo.jpg"
          alt="APPEM Logo"
          width={80}
          height={80}
          className="rounded-2xl"
          priority
        />
        <h1 className="mt-8 font-display text-5xl tracking-tight">
          <span className="gradient-text">APPEM UI</span>
        </h1>
        <p className="mt-4 text-lg text-ink-500">
          Component Library &amp; Design System
        </p>

        {/* Stats */}
        <div className="mt-10 flex gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-mono text-3xl font-medium text-ink-950">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-ink-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Cards */}
      <div className="mt-20 grid gap-6 md:grid-cols-3">
        {categories.map((cat) => (
          <Link
            key={cat.href}
            href={cat.href}
            className="group rounded-xl border border-ink-200 bg-white p-6 transition-all hover:border-brand-300 hover:shadow-md"
          >
            <div className="flex items-baseline justify-between">
              <h2 className="font-display text-xl text-ink-950 group-hover:text-brand-600 transition-colors">
                {cat.title}
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                  &rarr;
                </span>
              </h2>
              <span className="font-mono text-sm text-ink-400">
                {cat.count}
              </span>
            </div>
            <p className="mt-2 text-sm text-ink-500">{cat.description}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {cat.components.slice(0, 6).map((c) => (
                <span
                  key={c}
                  className="rounded-md bg-ink-50 px-2 py-0.5 text-xs text-ink-600 font-mono"
                >
                  {c}
                </span>
              ))}
              {cat.components.length > 6 && (
                <span className="rounded-md bg-ink-50 px-2 py-0.5 text-xs text-ink-400">
                  +{cat.components.length - 6}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Design Tokens Preview */}
      <div className="mt-20">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-2xl text-ink-950">Design Tokens</h2>
          <Link
            href="/tokens"
            className="text-sm text-brand-600 hover:text-brand-700"
          >
            View all &rarr;
          </Link>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {/* Colors */}
          <div className="rounded-xl border border-ink-200 bg-white p-6">
            <h3 className="text-sm font-medium text-ink-700 mb-4">
              Color Palette
            </h3>
            <div className="space-y-3">
              <div>
                <div className="text-xs text-ink-400 mb-1.5">Brand</div>
                <div className="flex gap-1">
                  {brandSwatches.map((s) => (
                    <div
                      key={s.shade}
                      className="h-8 flex-1 rounded-md first:rounded-l-lg last:rounded-r-lg"
                      style={{ backgroundColor: s.hex }}
                      title={`brand-${s.shade}: ${s.hex}`}
                    />
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs text-ink-400 mb-1.5">Ink</div>
                <div className="flex gap-1">
                  {inkSwatches.map((s) => (
                    <div
                      key={s.shade}
                      className="h-8 flex-1 rounded-md first:rounded-l-lg last:rounded-r-lg"
                      style={{ backgroundColor: s.hex }}
                      title={`ink-${s.shade}: ${s.hex}`}
                    />
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs text-ink-400 mb-1.5">Accent</div>
                <div className="flex gap-2">
                  {Object.entries(colors.accent).map(([name, hex]) => (
                    <div key={name} className="flex items-center gap-2">
                      <div
                        className="h-8 w-8 rounded-md"
                        style={{ backgroundColor: hex }}
                      />
                      <span className="font-mono text-xs text-ink-500">
                        {name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Typography */}
          <div className="rounded-xl border border-ink-200 bg-white p-6">
            <h3 className="text-sm font-medium text-ink-700 mb-4">
              Typography
            </h3>
            <div className="space-y-4">
              <div>
                <div className="text-xs text-ink-400 mb-1">
                  Display — Instrument Serif
                </div>
                <div className="font-display text-2xl text-ink-950">
                  The quick brown fox
                </div>
              </div>
              <div>
                <div className="text-xs text-ink-400 mb-1">
                  Body — DM Sans
                </div>
                <div className="font-body text-base text-ink-700">
                  The quick brown fox jumps over the lazy dog
                </div>
              </div>
              <div>
                <div className="text-xs text-ink-400 mb-1">
                  Mono — JetBrains Mono
                </div>
                <div className="font-mono text-sm text-ink-600">
                  const appem = &quot;design-system&quot;;
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
