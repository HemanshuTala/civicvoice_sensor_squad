module.exports = {
    content: [
      "./index.html",    // Vite's entry point
      "./src/**/*.{js,ts,jsx,tsx}", // All source files
    ],
    theme: {
      extend: {
        fontFamily: {
          roboto: ['Roboto', 'sans-serif'],
        },
      },
    },
    plugins: [],
  };
  