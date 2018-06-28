import path from 'path'
import os from 'os'
import { argv } from 'yargs'
import * as webpackConfig from './webpack'

const config = new Object()
const context = new Object()
const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'

context.host = (() => {
  const interfaces = os.networkInterfaces()
  let _host = ''

  for (let dev in interfaces) {
    interfaces[dev].forEach((alias) => {
      if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {  
        _host = alias.address
        return
      }
    })
  }

  return _host
})()
context.port = '3000'

const entries = webpackConfig.entry({
  fields: `./src/`,
  project: (argv.project && argv.project.length > 0) ? argv.project : null,
  url: '**/*.js',
  isDev,
  context
})
console.log('入口文件: \n', entries)

const output = {
  path: path.resolve(__dirname, './dist'),
  filename: isProd ? '[name].js?[chunkhash:8]' : '[name].js?[hash:8]',
  publicPath: `http://${context.host}:${context.port}/`
}

// 
// mode
// -----------------------------------------------------------------------------
config.mode = process.env.NODE_ENV || argv.env || 'production'

// 
// entry
// -----------------------------------------------------------------------------
config.entry = entries

// 
// output
// -----------------------------------------------------------------------------
config.output = output

// 
// module
// -----------------------------------------------------------------------------
config.module = webpackConfig.module

// 
// plugins
// -----------------------------------------------------------------------------
config.plugins = new Array()
if (isProd) {
  webpackConfig.plugins.cleanDist({config})
}
if (isDev) {
  webpackConfig.plugins.hotModule({config})
}
webpackConfig.plugins.cssChunks({config})
webpackConfig.plugins.htmlChunks({entries, config})

// 
// optimization
// -----------------------------------------------------------------------------
config.optimization = webpackConfig.optimization

// 
// Don't attempt to continue if there are any errors.
// -----------------------------------------------------------------------------
config.bail = !isDev

// 
// cache
// -----------------------------------------------------------------------------
config.cache = isDev

export default config