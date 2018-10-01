const autoprefixer = require('autoprefixer');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: [
    'babel-polyfill',
    './src/index.jsx',
  ],
  module: {
    rules: [{
      test: require.resolve('blueimp-file-upload'),
      loader: 'imports-loader?define=>false',
    }, {
      test: require.resolve('medium-editor-insert-plugin'),
      loader: 'imports-loader?define=>false',
    }, {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader', 'eslint-loader'],
    }, {
      test: /\.(css|less)$/,
      loader: [{
        loader: 'style-loader',
      }, {
        loader: 'css-loader',
      }, {
        loader: 'postcss-loader',
        options: {
          plugins: [
            autoprefixer({
              browsers: ['ie >= 8', 'last 4 version'],
            }),
          ],
        },
      }, {
        loader: 'less-loader',
      }],
    }, {
      test: /\.(ttf|eot|woff|woff2)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: './fonts/[name].[ext]',
        },
      },
    }, {
      test: /\.(png|svg|gif|jpg|jpeg)/,
      use: {
        loader: 'url-loader',
        options: {
          name: 'images/[name].[ext]',
          limit: 300000,
        },
      },
    }, {
      test: /\.(html)$/,
      use: {
        loader: 'html-loader',
        options: {
          attrs: [':data-src'],
        },
      },
    }],
  },
  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'test'),
    // }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      hash: true,
    }),
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules'),
    ],
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'app.js',
    publicPath: '/',
  },
  devServer: {
    hot: false,
    inline: false,
    contentBase: './public',
    historyApiFallback: true,
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: /node_modules/
  }
};
