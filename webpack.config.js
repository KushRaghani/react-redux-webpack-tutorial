const path = require('path'),
  webpack = require('webpack'),
  loaders = require('./webpack.loaders'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  DashboardPlugin = require('webpack-dashboard/plugin'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  HOST = process.env.HOST || '127.0.0.1',
  PORT = process.env.PORT || '8888';

module.exports = {
  devtool: process.env.WEBPACK_DEVTOOL || 'eval-source-map',
  entry: [
    'react-hot-loader/patch',
    path.join(__dirname, 'src/index.jsx')
  ],
  output: {
  	path: path.join(__dirname, '/dist/'),
  	filename: '[name].js',
  	publicPath: '/'
  },
  resolve: {
    extensions: ['.js','.jsx']
  },
  module: {
    loaders
  },
  devServer: {
    contentBase: "./dist",
    noInfo: true,
    hot: true,
    inline: true,
    historyApiFallback: true,
    port: PORT,
    host: HOST
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true
    }),
    new DashboardPlugin(),
    new HtmlWebpackPlugin({
      template: './src/template.html',
      files: {
      	css: ['style.css'],
        js: [ "bundle.js"]
      }
    })
  ]
};