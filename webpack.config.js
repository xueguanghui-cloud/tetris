const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve("./dist"),
    filename: "srcipt/bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true, // 启用类型检查
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"], // 针对 ts js 文件进行解析
  },
};
