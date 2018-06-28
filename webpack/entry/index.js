import glob from 'glob'

/**
 * webpack entry 多文件处理
 *
 * @export
 * @param {String} fields 入口的域
 * @param {String} url 入口的通配 js
 * @param {Boolean} isDev 是否为开发模式
 * @param {Object} context webpack config 上下文
 * @param {String} project 指定的项目路径
 * @returns
 */
export default function ({fields, url, isDev, context, project}) {
  const _files = glob.sync(`${fields}${url}`)
  const entries = new Object()

  const _componentRe = new RegExp('\component[s]?\/', 'i')
  const _privateRe = new RegExp('\_')
  const _projectRe = new RegExp(`\\${project}\/`)

  _files.forEach( (filepath) => {
    let _name = filepath.split('.js')[0]

    // 
    // 使用正则过滤 component(s)/ 组件文件夹
    // 使用正则过滤 _ 开头的私有文件（夹）
    // -----------------------------------------------------------------------------
    if (
      _componentRe.test(_name) 
      || _privateRe.test(_name) 
      || (project && project.length > 0 && !_projectRe.test(_name))  
    ) return
    // 
    // 使用正则实现 replace all 效果
    // -----------------------------------------------------------------------------
    let _module = _name.replace(new RegExp(fields, 'g'), '')
    entries[ _module ] = [
      filepath, 
      `webpack-hot-middleware/client?path=http://${context.host}:${context.port}/__webpack_hmr`
    ]
    isDev ? null : entries[ _module ].pop()
  })

  return entries
}