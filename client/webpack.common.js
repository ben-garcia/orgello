const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // 'babel-loader' is used to transpile es2015 and jsx into JS.
        use: ['babel-loader'],
      },
    ],
  },
  plugins: [
    // creates html file to inject css and js.
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
