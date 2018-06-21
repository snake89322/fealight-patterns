import glob from 'glob'

/**
 * webpack entry 多文件处理
 *
 * @export
 * @param {Object} opts
 * @param {String} opts.fields 入口的域
 * @param {String} opts.url 入口的通配 js
 * @returns
 */
export default function (opts) {
  const _fields = opts.fields
  const _url = opts.url
  const files = glob.sync(`${_fields}${_url}`)
  const entries = new Object()

  files.forEach( (filepath) => {
    let _name = filepath.split('.js')[0]
    // 
    // 使用正则实现 replace all 效果
    // -----------------------------------------------------------------------------
    entries[ _name.replace(new RegExp(_fields, 'g'), '') ] = filepath
  })

  return entries
}