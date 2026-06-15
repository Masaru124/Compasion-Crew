export const fonts = {
  body: "'IBM Plex Sans', sans-serif",
  display: "'Fraunces', serif",
  mono: "'IBM Plex Mono', monospace",
} as const;

export const fontWeights = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const fontSizes = {
  hero: "clamp(2.5rem, 6vw, 5rem)",
  section: "clamp(1.75rem, 4vw, 3rem)",
  subtitle: "clamp(1.125rem, 2vw, 1.5rem)",
  body: "1rem",
  small: "0.875rem",
  xs: "0.75rem",
} as const;

export const lineHeights = {
  tight: 1.05,
  section: 1.1,
  subtitle: 1.4,
  body: 1.75,
  small: 1.5,
} as const;

export const letterSpacings = {
  hero: "-0.03em",
  section: "-0.02em",
  tight: "-0.01em",
  wide: "0.05em",
  widest: "0.3em",
} as const;

export const typography = {
  fonts,
  fontWeights,
  fontSizes,
  lineHeights,
  letterSpacings,
} as const;
