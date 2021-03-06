const merge = require('webpack-merge');
const path = require('path');

const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: 'bundle.js',
    // where the output is placed
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/', // same as devServer.publicPath
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(sa|sc)ss$/,
        // loaders are executed from right to left.
        // 'style-loader' is used to inject style tag into the DOM.
        // 'css-loader' is used to replace '@import' and 'url()'
        // to import/require().
        // 'sass-loader' compiles sass/scss into css
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  devServer: {
    // redirect all requests to index.html
    // react router will handle it from there.
    // prevent an error when refreshing a resource after the root
    // ex. /login
    historyApiFallback: true,
    publicPath: '/',
  },
});
