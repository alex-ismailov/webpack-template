const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const fs = require('fs');
const copyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets/',
};

// const PAGES_DIR = `${PATHS.src}/pages`;
const PAGES_DIR = `${PATHS.src}/pug/pages`;
const PAGES = fs
  .readdirSync(PAGES_DIR)
  .filter(fileName => fileName.endsWith('.pug'));

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
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node-modules/',
    }, {
      test: /\.pug$/,
      loader: 'pug-loader',
    }, {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loader: {
          scss: 'vue-style-loader!css-loader!sass-loader'
        }
      }
    }, {
      test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: `${PATHS.assets}fonts`,
      }
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]'
      },
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
      '~': 'src',
      'vue$': 'vue/dist/vue.js',
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].[contenthash].css`,
    }),
    new copyWebpackPlugin({
      patterns: [
        { from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img` },
        // { from: `${PATHS.src}/fonts`, to: `${PATHS.assets}fonts` }, // определил в rules
        { from: `${PATHS.src}/static`, to: '' },
      ],
    }),
    ...PAGES.map((page) => new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${page}`,
      // inject: false,
      filename: `./${page.replace(/.pug/, '.html')}`,
      // filename: `./pages/${page}`,
    })),
    // ...PAGES.map((page) => new HtmlWebpackPlugin({
    //   template: `${PAGES_DIR}/${page}`,
    //   inject: false,
    //   filename: `./${page}`,
    //   // filename: `./pages/${page}`,
    // })),
    // new HtmlWebpackPlugin({
    //   template:  `${PAGES_DIR}/index.html`,
    //   inject: false,
    // }), // дублирует index.html
    new CleanWebpackPlugin(),
  ],
};
