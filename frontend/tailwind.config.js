/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0A1F44",
          blue: "#0E2A6B",
          royal: "#1B3A8B",
          accent: "#2F6BE0",
          green: "#1FA372",
          greenDark: "#0E7A52",
          orange: "#F58220",
          orangeDark: "#E06A0F",
          ink: "#0B1A33",
          mist: "#F4F7FC",
          line: "#E4EAF4",
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Inter"', "system-ui", "sans-serif"],
        display: ['"Plus Jakarta Sans"', '"Manrope"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(13, 38, 99, 0.18)",
        card: "0 18px 50px -22px rgba(13, 38, 99, 0.28)",
        glow: "0 0 0 1px rgba(47,107,224,0.18), 0 18px 50px -22px rgba(47,107,224,0.45)",
      },
      borderRadius: {
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.10) 1px, transparent 0)",
        "navy-gradient":
          "linear-gradient(135deg, #0A1F44 0%, #0E2A6B 55%, #1B3A8B 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-soft": {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        float: "float 6s ease-in-out infinite",
        "pulse-soft": "pulse-soft 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
