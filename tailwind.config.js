// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#0b3faed4",
          accent: "#10b981",    
          secondary: "#1e293b", 
          muted: "#8da9e6d4",     
          danger: "#ff0000ff",    
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
