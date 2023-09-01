const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const joinPath = (target) => path.join(__dirname, target);

module.exports = {
  entry: [joinPath("src/index.ts")],
  devtool: process.env.NODE_ENV === "development" ? "source-map" : false,
  performance: {
    hints: false,
  },
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 600,
  },
  output: {
    path: joinPath("lib"),
    filename: "index.bundle.js",
    libraryTarget: "module",
    globalObject: "typeof self !== 'undefined' ? self : this",
  },
  experiments: {
    outputModule: true,
  },
  mode: process.env.NODE_ENV || "development",
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    extensions: [".tsx", ".ts", ".js"],
  },
  devServer: {
    index: "index.html",
    contentBase: joinPath("src/web"),
    compress: true,
    port: 8080,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/, joinPath("src/assets")],
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
            plugins: [
              ["@babel/plugin-transform-runtime"],
              [
                "@babel/plugin-transform-react-jsx",
                {
                  pragma: "h",
                  pragmaFrag: "Fragment",
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: [/node_modules/, joinPath("src/assets")],
        use: ["ts-loader"],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: joinPath("src/web/index.html"),
    }),
    new webpack.SourceMapDevToolPlugin({}),
  ],
};
