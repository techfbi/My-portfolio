/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // used for accents, buttons, links, and highlighted words
        accent: "#C19A6B",
        // Core dark theme surfaces, 
        background: "#0A0A0A",
        surface: "#141414",
        border: "#232323",
        // heading is full white, body is a dimmed blue grey, muted is even dimmer
        heading: "#FFFFFF",
        body: "#A8ADB7",
        muted: "#6B7280",
      },
       fontFamily: {
        // Montserrat carries all headings, matches the bold geometric weight in the design
        heading: ["Sora", "sans-serif"],
        // Inter carries all paragraph and label text, as instructed
        body: ["Manrope", "sans-serif"],
      },
      keyframes: {
        // Slides the track left by exactly half its own width
        // since the track holds two duplicated copies of the list, this creates a seamless loop
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 20s linear infinite",
      },
    },
  },
  plugins: [],
}