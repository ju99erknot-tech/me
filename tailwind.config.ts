import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#dc2626",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#1f2937",
          foreground: "#f9fafb",
        },
        muted: {
          DEFAULT: "#111827",
          foreground: "#9ca3af",
        },
        border: "var(--border)",
      },
      boxShadow: {
        "glow-red": "0 0 25px rgba(220, 38, 38, 0.4)",
        "glow-red-soft": "0 0 15px rgba(220, 38, 38, 0.2)",
      },
    },
  },
  plugins: [],
} satisfies Config;
