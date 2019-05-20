const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const SRC = path.join(__dirname, 'src');
const DIST = path.join(__dirname, 'dist');

module.exports = {
  mode: 'production',
  context: SRC,
  entry: './index',
  output: {
    path: DIST,
    filename: 'bundle/facebook-api.min.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: SRC,
        use: [
          { loader: 'expose-loader', options: 'facebook' },
          { loader: 'awesome-typescript-loader' },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [new TerserPlugin()],
  },
};
