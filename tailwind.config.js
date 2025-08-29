/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6366F1",      // Indigo
        primaryHover: "#4F46E5", // Darker Indigo
        secondary: "#14B8A6",    // Teal
        secondaryHover: "#0F766E",
        accent: "#F59E0B",       // Amber
        background: "#F3F4F6",   // Light Gray
        card: "#FFFFFF",          // White for cards
        error: "#EF4444",         // Red
        success: "#22C55E",       // Green
        info: "#3B82F6",          // Blue
      },
      borderRadius: {
        xl: "1rem",
        '2xl': "1.5rem",
      },
      boxShadow: {
        card: "0 10px 25px rgba(0, 0, 0, 0.1)",
        input: "0 2px 6px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
