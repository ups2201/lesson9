const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
// const PREFIX =  process.env.NODE_ENV == "production" ? '/otus-spa-deploy-2023-12' : ''

module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
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
    watchFiles: ["./dist/index.html"],
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./dist/index.html",
    }),
    new HtmlWebpackPlugin({
      template: "./dist/index.html",
      filename: "404.html",
    }),
    // new webpack.DefinePlugin({
    //   IS_PRODUCTION: NODE_ENV == "production",
    //   PREFIX: JSON.stringify(PREFIX),
    // }),
  ],
  mode: "development",
};
