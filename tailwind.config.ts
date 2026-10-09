import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Ubuntu", "Verdana", "ui-sans-serif", "system-ui"], display: ["Ubuntu Mono", "Ubuntu", "Verdana", "monospace"] },
      colors: {
        brand: {
          blue: "#0070AD",
          "dark-blue": "#005A82",
          "vibrant-blue": "#12ABDB",
          "deep-purple": "#2B0A3D",
          "tech-red": "#F53853",
          grey: "#ECECEC",
          white: "#FFFFFF",
          "zest-green": "#95E616",
          aqua: "#0F999C",
          "bright-purple": "#6D64CC"
        },
        navy: "#005A82",
        deep: "#005A82",
        enterprise: "#0070AD",
        electric: "#12ABDB",
        violet: "#2B0A3D",
        cyan: "#12ABDB",
        page: "#FFFFFF",
        surface: "#F7F9FA",
        border: "#D8E2E7",
        text: "#17243A",
        muted: "#5F6F7A",
        success: "#2F7D32",
        warning: "#B56A00",
        danger: "#C31932"
      },
      boxShadow: {
        enterprise: "0 8px 22px rgba(0, 90, 130, 0.08)"
      }
    }
  },
  plugins: [animate]
} satisfies Config;
