/* eslint import/no-extraneous-dependencies: 0 */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCSS = new ExtractTextPlugin({
  filename: 'vendor-[hash:5].css',
});
const extractSCSS = new ExtractTextPlugin({
  filename: 'main-[hash:5].css',
});
module.exports = {
  name: 'client',
  target: 'web',
  entry: {
    main: path.resolve(__dirname, '../src/app.jsx'),
    vendor: ['react', 'react-dom'],
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name]-[hash:5].js',
    chunkFilename: '[name]-[hash:5].js',
  },
  module: {
    rules: [
      //  jsx 解析
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, '../src'),
        ],
        loader: 'babel-loader',
        options: {
          babelrc: false,
          compact: false,
          presets: [
            ['env', {
              targets: {
                browsers: ['last 2 versions', 'safari >= 7', 'ie >= 9', 'iOS >= 8', 'Android >= 4'],
              },
            }],
            'react',
            'stage-2',
          ],
        },
      },
      // 解析scss
      {
        test: /\.scss$/,
        use: extractSCSS.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          }, {
            loader: 'postcss-loader',
          }, {
            loader: 'sass-loader',
          }],
        }),
      },
      // 解析css
      {
        test: /\.css$/,
        use: extractCSS.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          }, {
            loader: 'postcss-loader',
          }],
        }),
      },
      // 处理图片
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          'url-loader?limit=10000&name=[name]-[hash:5].[ext]&publicPath=./&outputPath=imgs/',
          {
            loader: 'img-loader',
            options: {
              mozjpeg: {
                quality: 80,
                smooth: 30,
              },
              optipng: true, // disabled
              pngquant: {
                floyd: 0.2,
                speed: 1,
              },
            },
          },
        ],
      },
      // 字体解析
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff&publicPath=./&outputPath=./fonts/',
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff&publicPath=./&outputPath=./fonts/',
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&minetype=application/octet-stream&publicPath=./&outputPath=./fonts/',
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?publicPath=./&outputPath=./fonts/',
      },
      {
        test: /\.svg$/,
        loader: 'url-loader?limit=10000&minetype=application/octet-stream&publicPath=./&outputPath=./fonts/',
      },
      {
        test: /\.mp3$/,
        loader: 'file-loader?publicPath=./&outputPath=./music/',
      },
    ],
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, '../src'),
    ],
    extensions: ['.js', '.json', '.jsx', '.css'],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      children: true,
      filename: 'commons.js',
      minChunks: 2,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.ejs'),
      favicon: path.resolve(__dirname, '../public/favicons/favicon.ico'),
    }),
    extractCSS,
    extractSCSS,
  ],
};
