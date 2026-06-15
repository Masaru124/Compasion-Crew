export const colors = {
  light: {
    bg: "#F7F5F1",
    surface: "#FFFFFF",
    surfaceElevated: "#FCFBF8",
    border: "#E7E2DA",
    input: "#E7E2DA",
    ring: "#1F5D50",

    text: {
      primary: "#1F2933",
      secondary: "#52606D",
      muted: "#7B8794",
    },

    primary: "#1F5D50",
    primaryHover: "#184A40",
    primaryForeground: "#FFFFFF",

    accent: "#C46A4A",
    accentHover: "#A95539",

    secondary: "#F0EDE8",
    secondaryForeground: "#1F2933",

    muted: "#F0EDE8",
    mutedForeground: "#7B8794",

    success: "#2E7D5A",
    warning: "#D89A1B",
    danger: "#C74B4B",

    card: "#FFFFFF",
    cardForeground: "#1F2933",
    popover: "#FFFFFF",
    popoverForeground: "#1F2933",
    destructive: "#C74B4B",
    destructiveForeground: "#FFFFFF",

    sidebar: "#FCFBF8",
    sidebarForeground: "#1F2933",
    sidebarPrimary: "#1F5D50",
    sidebarPrimaryForeground: "#FFFFFF",
    sidebarAccent: "#F0EDE8",
    sidebarAccentForeground: "#1F2933",
    sidebarBorder: "#E7E2DA",
    sidebarRing: "#1F5D50",

    chart1: "#1F5D50",
    chart2: "#C46A4A",
    chart3: "#5C8A73",
    chart4: "#D89A1B",
    chart5: "#52606D",
  },

  dark: {
    bg: "#111827",
    surface: "#161F2B",
    surfaceElevated: "#1E293B",
    border: "#1E293B",
    input: "#1E293B",
    ring: "#2D8A76",

    text: {
      primary: "#E2E8F0",
      secondary: "#94A3B8",
      muted: "#64748B",
    },

    primary: "#2D8A76",
    primaryHover: "#3A9D87",
    primaryForeground: "#FFFFFF",

    accent: "#C46A4A",
    accentHover: "#D47A5A",

    secondary: "#1E293B",
    secondaryForeground: "#E2E8F0",

    muted: "#1E293B",
    mutedForeground: "#94A3B8",

    success: "#34D399",
    warning: "#FBBF24",
    danger: "#F87171",

    card: "#161F2B",
    cardForeground: "#E2E8F0",
    popover: "#161F2B",
    popoverForeground: "#E2E8F0",
    destructive: "#EF4444",
    destructiveForeground: "#FFFFFF",

    sidebar: "#161F2B",
    sidebarForeground: "#E2E8F0",
    sidebarPrimary: "#2D8A76",
    sidebarPrimaryForeground: "#FFFFFF",
    sidebarAccent: "#1E293B",
    sidebarAccentForeground: "#E2E8F0",
    sidebarBorder: "#1E293B",
    sidebarRing: "#2D8A76",

    chart1: "#2D8A76",
    chart2: "#C46A4A",
    chart3: "#5C8A73",
    chart4: "#D89A1B",
    chart5: "#94A3B8",
  },
} as const;

export type ThemeColorScheme = typeof colors.light;
