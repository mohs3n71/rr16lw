const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')
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
  }),
  new AntdDayjsWebpackPlugin(),
]

const lessPlugins = [
  new LessPluginCleanCSS({
    advanced: true
  })
]

module.exports = {
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
      chunks: 'all',
      automaticNameDelimiter: '.',
      cacheGroups: {
        extractComments: 'all',
        vendors: {
          test: /\.js$/,
          priority: 1
        }
      }
    },
    runtimeChunk: {
      name: entryPoint => `manifest.${entryPoint.name}`
    }
  },
  context: path.resolve(__dirname, '../src'),
  entry: ["./index.js"],
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: '[chunkhash].js',
    sourceMapFilename: '[chunkhash].map'
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
        test: /\.(jpg|png|gif|svg)$/,
        loader: 'image-webpack-loader',
        // Specify enforce: 'pre' to apply the loader
        // before url-loader/svg-url-loader
        // and not duplicate it in rules with them
        enforce: 'pre',
        options: {
          disable: true
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      }
    ]
  },
  plugins: webpackPlugins,
  performance: {
    hints: false,
    maxAssetSize: 2621440
  }
}
