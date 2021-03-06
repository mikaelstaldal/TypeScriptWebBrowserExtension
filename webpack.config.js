const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const sourceRootPath = path.join(__dirname, "src");
const contentScriptsPath = path.join(sourceRootPath, "ts", "contentScripts");
const distRootPath = path.join(__dirname, "dist");
const nodeEnv = process.env.NODE_ENV ? process.env.NODE_ENV : "development";

module.exports = {
  watch: nodeEnv === "watch",
  entry: {
    background: path.join(sourceRootPath, "ts", "background", "index.ts"),
    myContent: path.join(contentScriptsPath, "myContent", "index.ts"),
  },
  output: {
    path: distRootPath,
    filename: "[name].js",
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".json"],
  },
  module: {
    rules: [{ test: /\.(ts|tsx)?$/, loader: "ts-loader", exclude: /node_modules/ }],
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.join(sourceRootPath, "assets"),
        to: path.join(distRootPath, "assets"),
        test: /\.(jpg|jpeg|png|gif|svg|ogg)?$/,
      },
      {
        from: path.join(sourceRootPath, "manifest.json"),
        to: path.join(distRootPath, "manifest.json"),
        toType: "file",
      },
    ]),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(nodeEnv),
    }),
    new CleanWebpackPlugin(),
  ],
};
