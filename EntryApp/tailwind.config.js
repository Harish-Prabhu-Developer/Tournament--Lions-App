/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/App.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
//         | Element           | Color Code                   |
// | ----------------- | ---------------------------- |
// | Primary Color     | `#002366` (Royal Blue)       |
// | Secondary Color   | `#FFD700` (Gold Yellow)      |
// | Background Color  | `#F0F4F8` (Light Grey/White) |
// | Text Color        | `#1A1A1A` (Almost Black)     |
// | Card Color        | `#FFFFFF`                    |
// | Card Border Color | `#E0E0E0`                    |

        primary: "#002366", // Royal Blue
        secondary: "#FFD700", // Gold Yellow
        background: "#F0F4F8", // Light Grey/White
        text: "#1A1A1A", // Almost Black
        card: "#FFFFFF", // White
        cardBorder: "#E0E0E0", // Light Grey for Card Borders

      },
    },
  },
  plugins: [],
}

