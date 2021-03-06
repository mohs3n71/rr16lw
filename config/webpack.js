const TerserPlugin = require('terser-webpack-plugin')
const DefinePlugin = require('webpack').DefinePlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const LessPluginCleanCSS = require('less-plugin-clean-css')
const path = require('path')

const package = require('../package.json')
const __PROD__ = process.env.NODE_ENV === 'production'

const webpackPlugins = [
  new DefinePlugin({
    process: {
      env: {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        VERSION: JSON.stringify(package.version),
        THEME: JSON.stringify(package.theme)
      }
    }
  }),
  new HtmlWebpackPlugin({
    title: 'Starter Kit',
    template: path.resolve(__dirname, './template.ejs')
  })
]

const lessPlugins = [
  new LessPluginCleanCSS({
    advanced: true
  })
]

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: false,
    port: 9000,
  },
  mode: process.env.NODE_ENV,
  optimization: {
    minimize: __PROD__,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        terserOptions: {
        }}),
    ],
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        }
      }
    },
    runtimeChunk: 'single',
    moduleIds: 'hashed',
  },
  context: path.resolve(__dirname, '../src'),
  entry: ["./index.js"],
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  devtool: __PROD__ ? '' : 'hidden-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader',
            options: {
              modifyVars: package.theme,
              paths: [
                path.resolve(__dirname, '../node_modules')
              ],
              plugins: lessPlugins,
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: '@svgr/webpack',
            options: {
              babel: false,
              icon: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: ['file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              disable: false,
              mozjpeg: {
                progressive: true,
                quality: 65
              }
            }
          }],
      }
    ]
  },
  plugins: webpackPlugins,
  performance: {
    hints: false,
    maxAssetSize: 2621440
  }
}
