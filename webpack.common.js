/* eslint-disable import/no-extraneous-dependencies */
// @flow
const path = require("path");

module.exports = {
  entry: {
    app: ["@babel/polyfill", "react-hot-loader/patch", "./src/index"],
  },
  module: {
    rules: [
      // graphql
      {
        test: /\.(graphql|gql)$/,
        loader: "graphql-tag/loader",
      },
      // js
      {
        test: /\.js$/,
        loaders: ["babel-loader"],
        exclude: /node_modules/,
        include: path.resolve(__dirname, "./src"),
      },
      // workers
      {
        test: /\.worker\.js$/,
        use: [{ loader: "worker-loader" }, { loader: "babel-loader" }],
      },
      // styles
      {
        test: /.s[ac]ss$/i,
        exclude: /\.module\.scss$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: false,
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.module\.scss$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: {
                localIdentName: "[folder]-[local]-[hash:base64:5]",
              },
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      // less
      {
        test: /\.less$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "less-loader",
            options: {
              sourceMap: true,
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },
      // assets
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
      {
        test: /\.(jpe?g|png|eot|gif|ttf|woff|woff2)$/i,
        use: [
          "file-loader?hash=sha512&digest=hex&name=[hash].[ext]",
          {
            loader: "image-webpack-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src/"), // use alias instead of babel-plugin-root-import
      react: path.resolve("./node_modules/react"),
    },
  },
  node: {
    net: "empty",
    tls: "empty",
    dns: "empty",
    fs: "empty", // used to make WordCloud work
  },
};
