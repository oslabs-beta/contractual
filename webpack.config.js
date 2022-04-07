const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = [
  {
    mode: process.env.NODE_ENV,
    entry: "./src/main.ts",
    target: "electron-main",
    // devServer: {
    //   static: {
    //     directory: path.resolve(__dirname, "dist"),
    //     publicPath: "/dist",
    //   },
    // },
    module: {
      rules: [
        {
          test: /\.ts$/,
          include: /src/,
          use: [{ loader: "ts-loader" }],
        },
      ],
    },
    output: {
      path: __dirname + "/dist",
      filename: "main.js",
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
    mode: process.env.NODE_ENV,
    entry: "./src/React.tsx",
    target: "electron-renderer",
    devtool: "source-map",
    // devServer: {
    //   static: {
    //     directory: path.resolve(__dirname, "dist"),
    //     publicPath: "/dist",
    //   },
    // },
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          include: /src/,
          use: [{ loader: "ts-loader" }],
        },
        {
          test: /\.s?css$/,
          use: ["style-loader", "css-loader", "sass-loader"],
          exclude: /\.module\.s?(c|a)ss$/,
        },
      ],
    },
    output: {
      path: __dirname + "/dist",
      filename: "react.js",
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
    ],
    resolve: {
      extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
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
