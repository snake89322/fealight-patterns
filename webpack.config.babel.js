import path from 'path'
import { argv } from 'yargs'
import * as webpackConfig from './webpack'

const config = new Object()
const entries = webpackConfig.entry({
  fields: "./src/",
  url: "**/*.js"
})
const isProd = process.env.NODE_ENV === 'production'
const isDebug = process.env.NODE_ENV === 'development'

// 
// entry
// -----------------------------------------------------------------------------
config.entry = entries

// 
// output
// -----------------------------------------------------------------------------
config.output = {
  path: path.resolve(__dirname, './dist'),
  filename: isProd ? '[name].js?[chunkhash:8]' : '[name].js?[hash:8]'
}

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
if (isDebug) {
  webpackConfig.plugins.hotModule({config})
}
webpackConfig.plugins.cssChunks({config})
webpackConfig.plugins.htmlChunks({entries, config})

// 
// optimization
// -----------------------------------------------------------------------------
config.optimization = webpackConfig.optimization

// 
// mode
// -----------------------------------------------------------------------------
config.mode = process.env.NODE_ENV || argv.env || 'production'

// 
// Don't attempt to continue if there are any errors.
// -----------------------------------------------------------------------------
config.bail = !isDebug

// 
// cache
// -----------------------------------------------------------------------------
config.cache = isDebug

export default config