const path = require('path');

const resolve = (url) => path.resolve(__dirname, url);
module.exports = {
  entry: {
    vendor: ['lodash', 'antd'],
    main: './index.js',
  },
  output: {
    path: resolve('../dist'),
    filename: 'js/[name].bundle.[contenthash].js',
    chunkFilename: 'js/[name].chunk.[chunkhash].js',
    publicPath: '/',
  },
  resolve: {
    alias: {
      '@': resolve('../src'),
    },
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
        }, {
            loader: "less-loader",
            options: {
              sourceMap: true,
            },
        }]
      },
      {
        test: /\.(js|jsx)$/,
        include: [resolve('../src')],
        use: {
          loader: 'eslint-loader',
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              ['import', {
                libraryName: 'antd',
                libraryDirectory: 'es',
                style: 'css',
              }],
              "@babel/plugin-transform-runtime"
            ]
          },
        }
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            }
          }
        ]
      }
    ],
  },
}