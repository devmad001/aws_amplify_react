/* eslint-disable import/no-extraneous-dependencies */
// @flow

const merge = require("webpack-merge");
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "source-map",
  output: {
    filename: "[name].[hash].js",
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace("@", "")}`;
          },
        },
      },
    },
  },
  devServer: {
    host: "localhost",
    inline: true,
    hot: true,
    historyApiFallback: true,
    contentBase: "public",
    overlay: {
      errors: true,
      warnings: true,
    },
  },
  plugins: [
    new Dotenv({
      path: "./.staging.env",
    }),
    new CopyPlugin({
      patterns: [
        { from: "public/favicon.ico", to: "favicon.ico" },
        { from: "public/images", to: "images" },
        { from: "public/vendors", to: "vendors" },
      ],
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, "./public/index.html"),
    }),
  ],
});
