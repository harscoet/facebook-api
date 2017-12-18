const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const SRC = path.join(__dirname, 'src');
const DIST = path.join(__dirname, 'dist');

module.exports = {
  devtool: 'source-map',
  context: SRC,
  entry: './index',
  output: {
    path: DIST,
    filename: 'bundle/facebook-api.min.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: SRC,
        use: [{ loader: 'expose-loader', options: 'facebook' }, 'awesome-typescript-loader'],
      },
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new UglifyJSPlugin({
      uglifyOptions: {
        beautify: false,
        ecma: 6,
        compress: true,
        comments: false
      }
    })
  ]
};
