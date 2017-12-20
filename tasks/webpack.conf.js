const { resolve } = require('path')
const r = url => resolve(__dirname, url)
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractSass = new ExtractTextPlugin({
  filename: '[name].wxss'
})

const config = require('../config')

module.exports = {
  devtool: false,
  output: {
    path: config.assetsPath,
    filename: '[name].js'
  },
  // 文件路径指向
  resolve: {
    alias: {
      utils: r('../utils/utils')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            'latest'
          ]
        }
      },
      {
        test: /\.sass$/,  // sass对应的loader
        use: extractSass.extract({
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: (loader) => [
                  require('autoprefixer')({
                    browsers: [
                      'last 2 versions'
                    ]
                  })
                ]
              }
            },
            {
              loader: 'sass-loader',
              options: {
                indentedSyntax: true
              }
            }
          ],
          fallback: 'style-loader'   
        })
      },
      {
        test: /\.mina$/,
        loader: 'wechat-mina-loader',
        options: {
          dist: './mina'
        }
      }
    ]
  },
  plugins: [
    extractSass,
    new CopyWebpackPlugin([  // 拷贝对应的资源到指定的路径
      {
        from : {
          glob: 'pages/**/*.json',
          to: ''
        } 
      }, {
        from: 'static',
        to: 'static'
      }
    ]),
    new webpack.optimize.ModuleConcatenationPlugin(),  // 提升作用域，提高运行效率
    new webpack.optimize.UglifyJsPlugin({
      souceMap: false
    }),
    new ProgressBarPlugin() // 打包进度条
  ]
}
