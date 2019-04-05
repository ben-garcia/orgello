const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const merge = require('webpack-merge');

const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: '[name].[contentHash].bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  optimization: {
    // minimize js and css
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc)ss$/,
        include: path.resolve(__dirname, 'src'),
        // order is important
        // does from right to left.
        use: [
          MiniCssExtractPlugin.loader,
          // loaders are executed from right to left.
          // 'style-loader' is used to inject style tag into the DOM.
          // 'css-loader' is used to replace '@import' and 'url()'
          // to import/require().
          // 'post-loader' is used to add vendor prefixes
          // 'sass-loader' compiles sass/scss into css
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.html$/,
        // use 'html-loader' to minimize the html output
        use: [{ loader: 'html-loader', options: { minimize: true } }],
      },
    ],
  },
  plugins: [
    // empty the 'build' directory before adding the output files.
    new CleanWebpackPlugin(),
    // extracts css into seperate files.
    new MiniCssExtractPlugin({
      filename: '[name].[contentHash].css',
      chunkFilename: '[id].css',
    }),
  ],
});
