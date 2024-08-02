const loginTheme = {
  name: 'login-theme',
  tokens: {
    colors: {
      background: { primary: '#032436' },
      border: {
        primary: '#2B4A5C',
        secondary: '#2B4A5C',
      },
      font: {
        primary: '#FDFEFF',
        hover: '#FDFEFF',
        secondary: '#B1B5B8',
        error: '#DA393B',
      },
      red: { 100: '#DA393B', 80: '#DA393B' },
    },

    components: {
      input: {},
      authenticator: {
        router: { borderWidth: '0', boxShadow: 'none' },
        form: { padding: '0px' },
        field: {},
      },
    },
  },
};

export { loginTheme };
