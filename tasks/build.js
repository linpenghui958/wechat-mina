require('shelljs/global')

const { resolve } = require('path')
const fs = require('fs')
const webpack = require('webpack')
const _ = require('lodash')
const r = url => resolve(process.cwd(), url)
const config = require('../config')
const webpackConf = require('./webpack.conf')

const assetsPath = config.assetsPath

// 删除并新建对应目录文件
rm('-rf', assetsPath)
mkdir(assetsPath)

const renderConf = webpackConf
// entry方法循环返回一个目录配置
const entry = () => _.reduce(config.json.pages, (en, i) => {
  en[i] = resolve(__dirname, '../', `${i}.mina`)

  return en
}, {})
// webpackConf输出配置
renderConf.output = {
  path: config.assetsPath,
  filename: '[name].js'
}

renderConf.entry = entry()
renderConf.entry.app = config.app
// 初始化webpack
const compiler = webpack(renderConf)

// 写入小程序所需的json文件
fs.writeFileSync(resolve(config.assetsPath, './app.json'), JSON.stringify(config.json), 'utf8')

//监听
compiler.watch({}, (err, stats) => {
  if (err) process.stdout.write(err)

  console.log('[webpack:build]', stats.toString({
    chunks: false,
    colors: true
  }))
})