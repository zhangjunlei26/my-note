const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const validate = require('webpack-validator')
import { parts, utils } from './client/webpack'

const projectRoot = __dirname

const PATHS = {
  app: path.resolve(__dirname, './client/entry.js'),
  build: path.join(__dirname, './public')
};

const common = {
  entry: {
    app: PATHS.app,
    vendor: ['vue', 'vue-router', 'vuex']
  },
  output: {
    path: PATHS.build,
    publicPath: '/',
    filename: 'assets/js/[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.css'],
    alias: {
      // https://github.com/vuejs/vue/wiki/Vue-2.0-RC-Starter-Resources
      // vue: 'vue/dist/vue',
      src: path.resolve(__dirname, '../client'),
      libs: path.resolve(__dirname, '../client/libs'),
      views: path.resolve(__dirname, '../client/views'),
      package: path.resolve(__dirname, '../package.json'),
      assets: path.resolve(__dirname, '../client/assets'),
      components: path.resolve(__dirname, '../client/components'),
      // vue-addon
      'vuex-store': path.resolve(__dirname, '../client/store')
    }
  },
  module: {
    // loaders: [
    //   { test: /\.css$/, loader: 'style-loader!css-loader' }
    // ],
    rules: [{
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          //name: utils.assetsPath('img/[name].[hash:7].[ext]')
          name: 'assets/img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|svg|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'assets/fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin('This file is created by zjl'),
    new HtmlWebpackPlugin({ title: 'mywiki' }),
    new webpack.LoaderOptionsPlugin({
      vue: {
        loaders: utils.cssLoaders({
          sourceMap: false,
          extract: false
        })
      }
    }),
  ]
};
let config;

// Detect how npm is run and branch based on that
switch (process.env.npm_lifecycle_event) {
  case 'build':
    config = merge(common, {});
    break;
  default:
    config = merge(common, parts.devServer({
      host: process.env.HOST,
      port: process.env.PORT
    }));
}

module.exports = validate(config);
