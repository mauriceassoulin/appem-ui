import { colors, spacing, radii } from "@/lib/tokens";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-ink-200 bg-white p-8 mb-8">
      <h2 className="font-display text-2xl text-ink-950 mb-6">{title}</h2>
      {children}
    </section>
  );
}

function ColorScale({
  name,
  scale,
}: {
  name: string;
  scale: Record<string, string>;
}) {
  return (
    <div>
      <h3 className="text-sm font-medium text-ink-700 mb-3 capitalize">{name}</h3>
      <div className="grid grid-cols-11 gap-2">
        {Object.entries(scale).map(([shade, hex]) => {
          const isLight = ["50", "100", "200"].includes(shade);
          return (
            <div key={shade} className="text-center">
              <div
                className="h-14 rounded-lg mb-1.5 border border-ink-100"
                style={{ backgroundColor: hex }}
              />
              <div className="text-xs font-medium text-ink-600">{shade}</div>
              <div
                className={`font-mono text-[10px] ${isLight ? "text-ink-400" : "text-ink-400"}`}
              >
                {hex}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function TokensPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="font-display text-4xl text-ink-950">Design Tokens</h1>
      <p className="mt-3 text-ink-500 mb-12">
        Colors, typography, spacing, radii, and shadows that power every APPEM component.
      </p>

      {/* Colors */}
      <Section title="Color Palette">
        <div className="space-y-8">
          <ColorScale name="Brand" scale={colors.brand} />
          <ColorScale name="Ink" scale={colors.ink} />

          <div>
            <h3 className="text-sm font-medium text-ink-700 mb-3">Accent</h3>
            <div className="flex gap-6">
              {Object.entries(colors.accent).map(([name, hex]) => (
                <div key={name} className="text-center">
                  <div
                    className="h-14 w-20 rounded-lg border border-ink-100 mb-1.5"
                    style={{ backgroundColor: hex }}
                  />
                  <div className="text-xs font-medium text-ink-600 capitalize">
                    {name}
                  </div>
                  <div className="font-mono text-[10px] text-ink-400">{hex}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Typography */}
      <Section title="Typography">
        <div className="space-y-8">
          <div>
            <div className="flex items-baseline gap-3 mb-4">
              <h3 className="text-sm font-medium text-ink-700">
                Display — Instrument Serif
              </h3>
              <span className="font-mono text-xs text-ink-400">
                font-display
              </span>
            </div>
            <div className="space-y-2 rounded-lg border border-ink-100 bg-ink-50/50 p-6">
              <div className="font-display text-5xl text-ink-950">
                Heading 1 — 3rem
              </div>
              <div className="font-display text-4xl text-ink-950">
                Heading 2 — 2.25rem
              </div>
              <div className="font-display text-3xl text-ink-950">
                Heading 3 — 1.875rem
              </div>
              <div className="font-display text-2xl text-ink-950">
                Heading 4 — 1.5rem
              </div>
              <div className="font-display text-xl text-ink-950">
                Heading 5 — 1.25rem
              </div>
              <div className="font-display text-lg italic text-ink-700">
                Italic variant — 1.125rem
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-baseline gap-3 mb-4">
              <h3 className="text-sm font-medium text-ink-700">
                Body — DM Sans
              </h3>
              <span className="font-mono text-xs text-ink-400">font-body</span>
            </div>
            <div className="space-y-3 rounded-lg border border-ink-100 bg-ink-50/50 p-6">
              {[
                { weight: "Light (300)", cls: "font-light" },
                { weight: "Regular (400)", cls: "font-normal" },
                { weight: "Medium (500)", cls: "font-medium" },
                { weight: "Semi-bold (600)", cls: "font-semibold" },
                { weight: "Bold (700)", cls: "font-bold" },
              ].map(({ weight, cls }) => (
                <div key={weight} className="flex items-baseline gap-4">
                  <span className="w-36 shrink-0 font-mono text-xs text-ink-400">
                    {weight}
                  </span>
                  <span className={`font-body text-base text-ink-800 ${cls}`}>
                    The quick brown fox jumps over the lazy dog
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-baseline gap-3 mb-4">
              <h3 className="text-sm font-medium text-ink-700">
                Mono — JetBrains Mono
              </h3>
              <span className="font-mono text-xs text-ink-400">font-mono</span>
            </div>
            <div className="rounded-lg border border-ink-100 bg-ink-50/50 p-6">
              <div className="font-mono text-sm text-ink-700 space-y-1">
                <div>const tokens = {`{`}</div>
                <div className="pl-4">brand: &quot;#0a7fff&quot;,</div>
                <div className="pl-4">ink: &quot;#0f1117&quot;,</div>
                <div className="pl-4">radius: &quot;0.625rem&quot;,</div>
                <div>{`}`};</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Spacing */}
      <Section title="Spacing Scale">
        <div className="space-y-3">
          {Object.entries(spacing).map(([key, val]) => (
            <div key={key} className="flex items-center gap-4">
              <span className="w-16 shrink-0 font-mono text-sm text-ink-500 text-right">
                {key}
              </span>
              <span className="w-20 shrink-0 font-mono text-xs text-ink-400">
                {val}
              </span>
              <div
                className="h-6 rounded-md bg-brand-200"
                style={{ width: `calc(${val} * 4)` }}
              />
            </div>
          ))}
        </div>
      </Section>

      {/* Border Radius */}
      <Section title="Border Radius">
        <div className="flex flex-wrap gap-6">
          {Object.entries(radii).map(([name, val]) => (
            <div key={name} className="text-center">
              <div
                className="h-16 w-16 border-2 border-brand-400 bg-brand-50 mx-auto"
                style={{ borderRadius: val }}
              />
              <div className="mt-2 text-xs font-medium text-ink-600">{name}</div>
              <div className="font-mono text-[10px] text-ink-400">{val}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Shadows */}
      <Section title="Shadows">
        <div className="flex flex-wrap gap-8">
          {[
            { name: "sm", cls: "shadow-sm" },
            { name: "DEFAULT", cls: "shadow" },
            { name: "md", cls: "shadow-md" },
            { name: "lg", cls: "shadow-lg" },
            { name: "xl", cls: "shadow-xl" },
          ].map(({ name, cls }) => (
            <div key={name} className="text-center">
              <div
                className={`h-16 w-24 rounded-xl bg-white border border-ink-100 ${cls}`}
              />
              <div className="mt-3 text-xs font-medium text-ink-600">
                {name}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}
