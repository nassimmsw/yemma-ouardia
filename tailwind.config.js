/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FAF3E8",
        sand: "#E8D5B0",
        terracotta: "#C4622D",
        clay: "#D4785A",
        amber: "#D4A017",
        olive: "#6B7A3E",
        walnut: "#3D2110",
        "walnut-light": "#5C3A1E",
        "muted-gold": "#B8960C",
        "warm-white": "#FDF8F0",
        "deep-brown": "#2A1508",
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        accent: ["Cormorant Garamond", "Georgia", "serif"],
      },
      backgroundImage: {
        "warm-gradient":
          "linear-gradient(135deg, #FAF3E8 0%, #E8D5B0 50%, #D4A017 100%)",
        "hero-gradient":
          "linear-gradient(180deg, rgba(42,21,8,0.3) 0%, rgba(42,21,8,0.7) 100%)",
      },
      animation: {
        "float-slow": "floatSlow 8s ease-in-out infinite",
        "float-medium": "floatMedium 6s ease-in-out infinite",
        "grain": "grain 0.4s steps(1) infinite",
        "shimmer": "shimmer 3s ease-in-out infinite",
        "moveBackground": "moveBackground 60s linear infinite",
      },
      keyframes: {
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(5deg)" },
        },
        floatMedium: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -10%)" },
          "20%": { transform: "translate(-15%, 5%)" },
          "30%": { transform: "translate(7%, -25%)" },
          "40%": { transform: "translate(-5%, 25%)" },
          "50%": { transform: "translate(-15%, 10%)" },
          "60%": { transform: "translate(15%, 0%)" },
          "70%": { transform: "translate(0%, 15%)" },
          "80%": { transform: "translate(3%, 35%)" },
          "90%": { transform: "translate(-10%, 10%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        moveBackground: {
          from: { backgroundPosition: "0% 0%" },
          to: { backgroundPosition: "0% -1000%" },
        },
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        warm: "0 4px 24px rgba(196, 98, 45, 0.15), 0 1px 4px rgba(196, 98, 45, 0.08)",
        "warm-lg": "0 12px 48px rgba(196, 98, 45, 0.2), 0 4px 12px rgba(196, 98, 45, 0.1)",
        amber: "0 4px 24px rgba(212, 160, 23, 0.2)",
        float: "0 20px 60px rgba(42, 21, 8, 0.15)",
      },
    },
  },
  plugins: [],
};
