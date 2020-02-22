
const path = require('path');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 指定入口文件，程序从这里开始编译,__dirname当前目录, ../表示上一级目录, ./同级目录
  entry: {
    index: [
      process.env.NODE_ENV == "production" ? './src/index.jsx' : './src/demo/index.js']
  },
  output: {
    path: path.resolve(__dirname, '../dist'), // 输出的路径
    filename: 'build.js', // 打包后文件
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader', // 加载器
        exclude: /node_modules/,
      },
      {
        test: /\.(css|pcss|scss)$/,
        use: [
          // {
          //   loader: MiniCssExtractPlugin.loader,
          // },
          {
            loader: 'style-loader',
            options: {
              singleton: true // 处理为单个style标签
            }
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              minimize: true // css代码压缩
            }
          },
          {
            loader: 'sass-loader',
            options: {
              minimize: true // css代码压缩
            }
          },
          {
            loader: 'less-loader',
            options: {
              minimize: true // css代码压缩
            }
          },
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              // 把较小的图片转换成base64的字符串内嵌在生成的js文件里
              limit: 100000,
              name: 'image/[name].[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(ttf|eot|woff|woff2)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    
  ],
};
