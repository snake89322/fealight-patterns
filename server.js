import Koa from 'koa'
import cors from 'koa2-cors'
import serve from 'koa-static'
import stream from 'stream'

import webpackDev from 'webpack-dev-middleware'
import webpackHot from 'webpack-hot-middleware'

import webpackConfig from './webpack.config.babel'

const app = new Koa()
const webpack = require("webpack")
const compiler = webpack(webpackConfig)

// devMiddleware.js
const devMiddleware = (compiler, opts) => {
  const middleware = webpackDev(compiler, opts)
  middleware.waitUntilValid(() => {
    console.log('Package is in a valid state');
  })
  return async (ctx, next) => {
    await middleware(ctx.req, {
      end: (content) => {
        ctx.body = content
      },
      setHeader: (name, value) => {
        ctx.set(name, value)
      }
    }, next)
  }
}

// hotMiddleware.js
const PassThrough = stream.PassThrough;

const hotMiddleware = (compiler, opts) => {
  const middleware = webpackHot(compiler, opts);
  return async (ctx, next) => {
    let stream = new PassThrough()
    ctx.body = stream
    await middleware(ctx.req, {
      write: stream.write.bind(stream),
      writeHead: (status, headers) => {
        ctx.status = status
        ctx.set(headers)
      }
    }, next)
  }
}

app.use(cors())

// webpack-dev-middleware logger
app.use(devMiddleware(compiler, {
  logLevel: 'warn',
}));
app.use(hotMiddleware(compiler, {}));

app.use(serve(__dirname + "/dist/", {extensions: ['html']}));

let server = app.listen(3000, '0.0.0.0', () => {
  let host = server.address().address
  let port = server.address().port

  console.log('Listening at http://%s:%s', host, port)
})

// response

// app.use(async ctx => {
//   ctx.body = 'Hello World'
// })
