/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './.storybook/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: ['animate-ripple'],
  theme: {
    extend: {
      animation: {
        ripple: 'ripple 0.5s linear',
      },
      keyframes: {
        ripple: {
          '0%': {
            transform: 'scale(0)',
            opacity: '0.3',
          },
          '100%': {
            transform: 'scale(8)',
            opacity: '0',
          },
        },
      },
    },
  },
}
