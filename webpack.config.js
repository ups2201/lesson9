const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");
const path = require("path");
// const PREFIX = process.env.NODE_ENV === "production" ? "/lesson9" : "";

module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    // publicPath: PREFIX + "/",
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "./images",
            },
          },
        ],
      },
      {
        test: /\.(?:js|mjs|cjs|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  devServer: {
    static: "./dist",
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "404.html",
    }),
    // new DefinePlugin({
    //   PREFIX: JSON.stringify(PREFIX),
    //   IS_PRODUCTION: process.env.NODE_ENV === "production",
    // }),
  ],
  mode: "development",
};
