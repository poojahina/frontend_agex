import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Inter", "ui-sans-serif", "system-ui"] },
      colors: {
        navy: "#101C3D",
        deep: "#173B70",
        enterprise: "#1769AA",
        electric: "#2588D8",
        cyan: "#36B4DD",
        page: "#F5F8FC",
        border: "#E1E8F0",
        text: "#17243A",
        muted: "#64748B",
        success: "#16865D",
        warning: "#D99519",
        danger: "#D34B55"
      },
      boxShadow: {
        enterprise: "0 12px 28px rgba(16, 28, 61, 0.08)"
      }
    }
  },
  plugins: [animate]
} satisfies Config;
