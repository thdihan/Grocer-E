module.exports = {
    content: ["./src/**/*.{html,js}"],
    purge: [],
    theme: {
      extend: {
        colors: {
          clifford: '#da373d',
          transparent: 'transparent',
          current: 'currentColor',
          white: '#ffffff',
          cupink: '#ff8086',
        },
      },
    },
    utilities: {
      'vh': '100vh',
    },
    plugins: [
      require('@tailwindcss/forms'),
      // ...
    ],
  };
  