const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const copyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets/',
};

module.exports = {
  externals: {
    paths: PATHS,
  },
  entry: {
    app: PATHS.src,
    lk: `${PATHS.src}/lk.js`,
  },
  output: {
    filename: `${PATHS.assets}js/[name].[contenthash].js`,
    path: PATHS.dist,
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true,
        },
      }
    }
  },
  module: {
    rules: [{
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]'
      },
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node-modules/',
    }, {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loader: {
          scss: 'vue-style-loader!css-loader!sass-loader'
        }
      }
    }, {
      test: /\.scss$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { 
            sourceMap: true,
            // url: false,
          },
        }, {
          loader: 'postcss-loader',
          options: {
            // postcssOptions: { sourceMap: true, config: './postcss.config.js' }
            postcssOptions: { sourceMap: true }
          },
        }, {
          loader: 'sass-loader',
          options: { sourceMap: true },
        }
      ],
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true },
        }, {
          loader: 'postcss-loader',
          options: {
            // postcssOptions: { sourceMap: true, config: './postcss.config.js' }
            postcssOptions: { sourceMap: true }
          },
        },
      ],
    }],
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.js'
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].[contenthash].css`,
    }),
    new HtmlWebpackPlugin({
      template: `${PATHS.src}/index.html`,
      inject: false,
      title: 'Webpack template'
    }),
    new copyWebpackPlugin({
      patterns: [
        { from: `${PATHS.src}/img`, to: `${PATHS.assets}img` },
        { from: `${PATHS.src}/static`, to: '' },
      ],
    }),
  ],
};