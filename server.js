import Koa from 'koa'
import serve from 'koa-static'
import stream from 'stream'

import webpackDev from 'webpack-dev-middleware'
import webpackHot from 'webpack-hot-middleware'

import webpackConfig from './webpack.config.babel'

const app = new Koa()
const webpack = require("webpack");
const compiler = webpack(webpackConfig);

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

// webpack-dev-middleware logger
app.use(devMiddleware(compiler, {
  logLevel: 'warn',
}));
app.use(hotMiddleware(compiler, {}));

app.use(serve(__dirname + "/dist/", {extensions: ['html']}));

app.listen(3000, () => {
  console.log('app listen at 3000')
});

// response

// app.use(async ctx => {
//   ctx.body = 'Hello World'
// })
