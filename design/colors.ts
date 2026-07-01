export const colors = {
  light: {
    bg: "#F8F8F8",
    surface: "#FFFFFF",
    surfaceElevated: "#FFFFFF",
    border: "#E8E8E8",
    input: "#E8E8E8",
    ring: "#000000",

    text: {
      primary: "#252525",
      secondary: "#6B6B6B",
      muted: "#8A8A8A",
    },

    primary: "#000000",
    primaryHover: "#1A1A1A",
    primaryForeground: "#FFFFFF",

    accent: "#8B6F5C",
    accentForeground: "#FFFFFF",

    secondary: "#4A7C70",
    secondaryHover: "#3D6B60",
    secondaryForeground: "#FFFFFF",

    muted: "#F0F0F0",
    mutedForeground: "#6B6B6B",

    success: "#4A7C70",
    warning: "#8B6F5C",
    danger: "#EF4444",

    card: "#FFFFFF",
    cardForeground: "#252525",
    popover: "#FFFFFF",
    popoverForeground: "#252525",
    destructive: "#EF4444",
    destructiveForeground: "#FFFFFF",
  },

  dark: {
    bg: "#1A1A1A",
    surface: "#252525",
    surfaceElevated: "#252525",
    border: "#333333",
    input: "#333333",
    ring: "#FFFFFF",

    text: {
      primary: "#F0F0F0",
      secondary: "#8A8A8A",
      muted: "#6B6B6B",
    },

    primary: "#FFFFFF",
    primaryHover: "#E0E0E0",
    primaryForeground: "#000000",

    accent: "#8B6F5C",
    accentForeground: "#FFFFFF",

    secondary: "#4A7C70",
    secondaryHover: "#5A8C80",
    secondaryForeground: "#FFFFFF",

    muted: "#252525",
    mutedForeground: "#8A8A8A",

    success: "#4A7C70",
    warning: "#8B6F5C",
    danger: "#EF4444",

    card: "#252525",
    cardForeground: "#F0F0F0",
    popover: "#252525",
    popoverForeground: "#F0F0F0",
    destructive: "#EF4444",
    destructiveForeground: "#FFFFFF",
  },
} as const;

export type ThemeColorScheme = typeof colors.light;
