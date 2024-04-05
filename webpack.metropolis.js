/* eslint-disable import/no-extraneous-dependencies */
// @flow

const merge = require( 'webpack-merge' );
const path = require( 'path' );

const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const Dotenv = require( 'dotenv-webpack' );
const CompressionPlugin = require( 'compression-webpack-plugin' );
const CopyPlugin = require( 'copy-webpack-plugin' );
const MomentLocalesPlugin = require( 'moment-locales-webpack-plugin' );
const webpack = require( 'webpack' );

const common = require( './webpack.common.js' );

module.exports = merge( common, {
  mode: 'production',
  devtool: false,
  // reference: https://medium.com/hackernoon/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758
  output: {
    filename: '[name].[contenthash:8].js',
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name( module ) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match( /[\\/]node_modules[\\/](.*?)([\\/]|$)/ )[ 1 ];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${ packageName.replace( '@', '' ) }`;
          },
        },
      },
    },
  },
  plugins: [
    new Dotenv( {
      path: './.metropolis.env',
    } ),
    new MomentLocalesPlugin(),
    new CleanWebpackPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new CopyPlugin( {
      patterns: [
        { from: 'public/favicon.ico', to: 'favicon.ico' },
        { from: 'public/images', to: 'images' },
        { from: 'public/vendors', to: 'vendors' },
      ],
    } ),
    new HtmlWebpackPlugin( {
      inject: true,
      template: path.resolve( __dirname, './public/index.html' ),
    } ),
    new CompressionPlugin( {
      filename: '[path].gz',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
    } ),
    new CompressionPlugin( {
      filename: '[path].br',
      algorithm: 'brotliCompress',
      test: /\.(js|css|html|svg)$/,
    } ),
  ],
} );
