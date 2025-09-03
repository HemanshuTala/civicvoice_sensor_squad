module.exports = {
    content: [
      "./index.html",    // Vite's entry point
      "./src/**/*.{js,ts,jsx,tsx}", // All source files
    ],
    theme: {
      extend: {
        colors: {
          trust: {
            primary: '#2563eb',    // Blue - trust and authority
            secondary: '#475569',  // Slate - professional and neutral
            success: '#059669',    // Emerald - success states
            warning: '#d97706',    // Amber - pending/attention
            danger: '#dc2626',     // Red - urgent/rejected
          }
        },
        fontFamily: {
          roboto: ['Roboto', 'sans-serif'],
          poppins: ['Poppins', 'sans-serif'],
        },
        spacing: {
          'component': '1.5rem',
          'section': '3rem',
          'page': '2rem',
        },
        animation: {
          'fade-in': 'fadeIn 0.3s ease-in-out',
          'slide-up': 'slideUp 0.3s ease-in-out',
          'scale-in': 'scaleIn 0.3s ease-in-out',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          slideUp: {
            '0%': { transform: 'translateY(20px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
          scaleIn: {
            '0%': { transform: 'scale(0.95)', opacity: '0' },
            '100%': { transform: 'scale(1)', opacity: '1' },
          },
        },
      },
    },
    plugins: [],
  };
  