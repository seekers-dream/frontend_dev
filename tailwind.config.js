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
        'hero-logistics': "url('./src/assets/images/logistics.jpg')",
        'footer-texture': "url('./src/assets/images/footer-texture.png')",
        'contact-bg': "url('./src/assets/images/contact-bg.jpg')",
        ready: "url('./src/assets/images/readyImg.jpg')",
      },
    },
  },
  plugins: [],
};
