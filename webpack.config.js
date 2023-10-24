const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: [
    './src/index.js',
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module:  {
    rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: []
        }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/views/index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [
          { from: './src/assets' }
      ]
    })
  ]
}