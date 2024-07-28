const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");
const path = require("path");
const PREFIX = process.env.NODE_ENV == "production" ? "/lesson9" : "";
// const PREFIX =  '/lesson9/'

module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: PREFIX + "/",
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
    ],
  },
  devServer: {
    watchFiles: ["./dict/index.html"],
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
    new DefinePlugin({
      PREFIX: JSON.stringify(PREFIX),
    }),
    // new webpack.DefinePlugin({
    //   IS_PRODUCTION: NODE_ENV == "production",
    //   PREFIX: JSON.stringify(PREFIX),
    // }),
  ],
  mode: "development",
};
