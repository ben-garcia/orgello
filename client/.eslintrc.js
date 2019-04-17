module.exports = {
  extends: 'airbnb',
  env: {
    browser: true,
  },
  plugins: ['prettier'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'prettier/prettier': 'error',
    // 'import/no-extraneous-dependencies': [
    //   'error',
    //   {
    //     devDependencies: true,
    //     optionalDependencies: true,
    //     peerDependencies: true,
    //   },
    // ],
  },
};
"plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  }