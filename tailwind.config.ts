import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Ubuntu", "Verdana", "ui-sans-serif", "system-ui"], display: ["Ubuntu Mono", "Ubuntu", "Verdana", "monospace"] },
      colors: {
        // Provisional tokens: no official Sogeti or Capgemini token source is present in this repository.
        navy: "#101C3D",
        deep: "#173B70",
        enterprise: "#0070AD",
        electric: "#00A1DE",
        violet: "#5D3B8C",
        cyan: "#00A1DE",
        page: "#F3F5F7",
        border: "#D9E0E7",
        text: "#17243A",
        muted: "#64748B",
        success: "#16865D",
        warning: "#D99519",
        danger: "#D34B55"
      },
      boxShadow: {
        enterprise: "0 2px 8px rgba(16, 28, 61, 0.07)"
      }
    }
  },
  plugins: [animate]
} satisfies Config;
