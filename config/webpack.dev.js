/* eslint import/no-extraneous-dependencies:0*/
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const ip = require('ip');
const webpack = require('webpack');
const path = require('path');

module.exports = Merge(CommonConfig, {
  devtool: 'cheap-module-source-map',
  devServer: {
    port: 3000,
    host: ip.address(),
    historyApiFallback: true,
    noInfo: false,
    stats: 'minimal',
    contentBase: path.join(__dirname, '../public'), // boolean | string | array, static file location
    compress: true, // enable gzip compression
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    proxy: {
      '/v3': {
        changeOrigin: true,
        // target: 'https://www.lingtouniao.com',
        target: 'http://192.168.18.194:8080',
        // pathRewrite: { '^/v3': '' }
      },
      '/api': {
        changeOrigin: true,
        // target: 'https://www.lingtouniao.com',
        target: 'http://192.168.0.188:9000',
        pathRewrite: { '^/api': '' },
      },
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});
