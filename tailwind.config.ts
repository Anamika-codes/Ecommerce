import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#FAF9F9",
          dark: "#072427",
          accent: "#B85D43",
          accentHover: "#9F4D36",
          surface: "#F3F2EE",
          surfaceAlt: "#EBE9E2",
          border: "rgba(7, 36, 39, 0.1)",
          borderDark: "rgba(250, 249, 249, 0.15)",
          muted: "#626D6E",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Red Hat Display", "sans-serif"],
        body: ["var(--font-body)", "Commissioner", "sans-serif"],
        mono: ["var(--font-mono)", "Source Code Pro", "monospace"],
      },
      borderRadius: {
        xs: "4px",
        sm: "6px",
        md: "8px",
      },
    },
  },
  plugins: [],
};
export default config;
