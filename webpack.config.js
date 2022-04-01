const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const miniCss = require('mini-css-extract-plugin');
const CssUrlRelativePlugin = require('css-url-relative-plugin');

module.exports = {
  mode: 'production',
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[contenthash].js',
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test:/\.(s*)css$/,
        use: [
           miniCss.loader,
           'css-loader',
           'sass-loader'
        ]
     }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body'
    }),
    new miniCss({
      filename: 'css/style.css'
   }),
    new CleanWebpackPlugin(),
    new CssUrlRelativePlugin()
  ]
};