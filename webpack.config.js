const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const Dotenv = require('dotenv-webpack');

module.exports = [
  {
    mode: 'development',
    entry: './src/main.ts',
    target: 'electron-main',
    module: {
      rules: [
        {
          test: /\.ts$/,
          include: /src/,
          use: [{ loader: 'ts-loader' }],
        },
      ],
    },
    output: {
      path: __dirname + '/dist',
      filename: 'main.js',
    },
  },
  // {
  //   mode: 'development',
  //   entry: './src/preload.ts',
  //   target: 'electron-preload',
  //   module: {
  //     rules: [{
  //       test: /\.ts$/,
  //       include: /src/,
  //       use: [{ loader: 'ts-loader' }]
  //     }]
  //   },
  //   output: {
  //     path: __dirname + '/dist',
  //     filename: 'preload.js'
  //   }
  // },
  {
    mode: 'development',
    entry: './src/React.tsx',
    target: 'electron-renderer',
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          include: /src/,
          use: [{ loader: 'ts-loader' }],
        },
        {
          test: /\.s?css$/,
          use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
          exclude: /\.module\.s?(c|a)ss$/,
        },
      ],
    },
    output: {
      path: __dirname + '/dist',
      filename: 'react.js',
    },
    plugins: [
      // new Dotenv(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html',
        chunks: ['main'],
      }),
      // new HtmlWebpackPlugin({
      //   filename: 'splash.html',
      //   template: './src/splash.html',
      //   chunks: ['main'],
      // }),
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    },
  },
  // {
  //   mode: 'development',
  //   entry: './src/renderer.ts',
  //   target: 'electron-renderer',
  //   module: {
  //     rules: [{
  //       test: /\.ts$/,
  //       include: /src/,
  //       use: [{ loader: 'ts-loader' }]
  //     }]
  //   },
  //   output: {
  //     path: __dirname + '/dist',
  //     filename: 'renderer.js'
  //   }
  // },
];
