const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const path = require('path');

module.exports = {
  entry: [
    'babel-polyfill',
    './src/index.jsx',
  ],

  plugins: [
    new CopyWebpackPlugin([
      { from: './src/favicon/*', flatten: true },
    ]),
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },

      {
        test: /\.(css)$/,
        loader: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[local]--[hash:base64:5]',
          },
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: [autoprefixer()],
          },
        }],
      },

      {
        test: /\.(less)$/,
        loader: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: [autoprefixer()],
          },
        }, {
          loader: 'less-loader',
        }],
      },

      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: './fonts/[name].[ext]',
          },
        },
      },

      {
        test: /\.(png|svg|gif|jpg|jpeg)/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'images/[name].[ext]',
            limit: 300000,
          },
        },
      },

      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':data-src'],
          },
        },
      },
    ],
  },

  resolve: {
    extensions: ['*', '.js', '.jsx'],
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
    ignored: /node_modules/,
  },
};
