/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // don't forget to add other files and directories
    "./src/pages/*.html",
		"./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    // other safelisted classes...
    '[x-cloak]',
  ],
}

