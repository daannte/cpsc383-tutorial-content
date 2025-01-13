import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./mdx-components.tsx",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Geist Sans", ...fontFamily.sans],
        mono: ["Geist Mono", ...fontFamily.mono],
      },
      colors: {
        background: "#fffdfd",
        foreground: "#514742",
      },
    },
  },
  plugins: [],
} satisfies Config;
