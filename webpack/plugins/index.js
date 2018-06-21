import glob from 'glob'
import path from 'path'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'

function cssChunks ({config}) {
  config.plugins.push(
    new ExtractTextPlugin({
      filename:  (getPath) => {
        return getPath('[name].css?[md5:contenthash:base64:5]').replace('css/js', 'css');
      },
      allChunks: true
    })
  )
}

function htmlChunks ({entries, config}) {
  Object.keys(entries).forEach( (name) => {
    const htmlFields = entries[name].replace('.js', '.html')
    // 
    // 每个页面生成一个html
    // -----------------------------------------------------------------------------
    const plugin = new HtmlWebpackPlugin({
      // 
      // 生成出来的html文件名
      // -----------------------------------------------------------------------------
      filename: name + '.html',
      // 
      // 每个html的模版，这里多个页面使用同一个模版
      // -----------------------------------------------------------------------------
      template: glob.sync(htmlFields).length === 0 ? path.resolve(__dirname, 'index.html') : htmlFields,
      // 
      // 自动将引用插入html
      // -----------------------------------------------------------------------------
      inject: true,
      // 每个html引用的js模块，也可以在这里加上vendor等公用模块
      chunks: [name, 'vendor'],
      // 自定义 option 在 html 中 使用 <%= htmlWebpackPlugin.options.external %> 调用
      // external: ["ex"]
    })
    config.plugins.push(plugin)
  })
}

function cleanDist ({config}) {
  const _cwdname = process.cwd()

  const plugin = new CleanWebpackPlugin( path.resolve(_cwdname, 'dist'), 
    {
      //
      // Absolute path to your webpack root folder (paths appended to this)
      // Default: root of your package
      // -----------------------------------------------------------------------------
      root: path.resolve(_cwdname),
      //
      // Instead of removing whole path recursively,
      // remove all path's content with exclusion of provided immediate children.
      // Good for not removing shared files from build directories.
      // -----------------------------------------------------------------------------
      exclude: [],
      //
      // Write logs to console.
      // -----------------------------------------------------------------------------
      verbose: false,
      //
      // Use boolean "true" to test/emulate delete. (will not remove files).
      // Default: false - remove files
      // -----------------------------------------------------------------------------
      dry: false,
      //
      // If true, remove files on recompile. 
      // Default: false
      // -----------------------------------------------------------------------------
      watch: true
    }
  )
  config.plugins.push(plugin)
}

function hotModule ({config}) {
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

export default {
  cssChunks,
  htmlChunks,
  cleanDist,
  hotModule
}