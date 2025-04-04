/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#001F3F',
        secondary: {
          100: '#E2E2D5',
          200: '#888883',
        },
      },
      backgroundImage: {
        'hero-pattern': "url('./src/assets/images/hero-bg.jpg')",
        'footer-texture': "url('./src/assets/images/footer-texture.png')",
      },
    },
  },
  plugins: [],
};
