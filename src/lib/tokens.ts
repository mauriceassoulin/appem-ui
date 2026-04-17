export const colors = {
  brand: {
    50: "#f0f7ff",
    100: "#e0efff",
    200: "#b8dcff",
    300: "#7ac0ff",
    400: "#3aa0ff",
    500: "#0a7fff",
    600: "#0062d6",
    700: "#004dab",
    800: "#00418d",
    900: "#003874",
    950: "#00234d",
  },
  ink: {
    50: "#f6f7f9",
    100: "#eceef2",
    200: "#d5d9e2",
    300: "#b0b8c9",
    400: "#8591ab",
    500: "#667391",
    600: "#515c78",
    700: "#434b62",
    800: "#3a4153",
    900: "#333947",
    950: "#0f1117",
  },
  accent: {
    warm: "#ff6b35",
    electric: "#00d4aa",
    subtle: "#e8f4f0",
  },
} as const;

export const fonts = {
  display: "var(--font-display)",
  body: "var(--font-body)",
  mono: "var(--font-mono)",
} as const;

export const spacing = {
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  6: "1.5rem",
  8: "2rem",
  12: "3rem",
  16: "4rem",
  24: "6rem",
} as const;

export const radii = {
  sm: "0.25rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  full: "9999px",
} as const;
