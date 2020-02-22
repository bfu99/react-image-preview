
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackConfig = require('./webpack.config');

module.exports = merge(webpackConfig, {
  mode: 'production',
  plugins: [
    new webpack.HashedModuleIdsPlugin()
  ],
  optimization: {
    minimizer: [new TerserPlugin()],
  },
});
