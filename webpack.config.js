const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist',
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node-modules/',
    }, {
      test: /\.scss$/,
      use: [
        "style-loader",
        MiniCssExtractPlugin.loader,
        {
          loader: "css-loader",
          options: { sourceMap: true },
        }, {
          loader: "postcss-loader",
          options: { sourceMap: true, config: { path: "./postcss.config.js" } },
        }, {
          loader: "sass-loader",
          options: { sourceMap: true },
        }
      ],
    }, {
      test: /\.css$/,
      use: [
        "style-loader",
        MiniCssExtractPlugin.loader,
        {
          loader: "css-loader",
          options: { sourceMap: true },
        }, {
          loader: "postcss-loader",
          options: { sourceMap: true, config: { path: "./postcss.config.js" } },
        },
      ],
    }],
  },
  devServer: {
    overlay: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
};