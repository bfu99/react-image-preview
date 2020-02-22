
const path = require('path');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

webpackConfig.entry.index.unshift('react-hot-loader/patch');
webpackConfig.plugins.push(new HtmlWebpackPlugin({
  template: path.resolve(__dirname, '../src/demo/index.html'),
  inject: true
}))

module.exports = merge(webpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  resolve: {
      alias: {
        'react-dom': '@hot-loader/react-dom'
      }
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest',
    },
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'), // 默认会以根文件夹提供本地服务器，这里指定文件夹
    inline: true, // 自动刷新
    hot: true, // 开启热模块替换
    historyApiFallback: true, // 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    port: 9090, // 如果省略，默认8080
    publicPath: '/',
    compress: true, // 使用gzip压缩
    stats: 'minimal',
  },
});
