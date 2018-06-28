import ExtractTextPlugin from 'extract-text-webpack-plugin'

const jsRule = {
  test: /\.(js|jsx)$/,
  exclude: /(node_modules)/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        presets: ['env', 'react'],
        plugins: ['react-hot-loader/babel', 'transform-decorators-legacy'],
        // 
        // This is a feature of `babel-loader` for webpack (not Babel itself).
        // It enables caching results in ./node_modules/.cache/babel-loader/
        // directory for faster rebuilds.
        // -----------------------------------------------------------------------------
        cacheDirectory: true,
      }
    }
  ]
}

const cssRule = {
  test: /\.css$/,
  use: ['style-loader', 'css-loader']
}

const sassRule = {
  test: /\.scss$/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        options: {
          minimize: true,
          modules: true,
          importLoaders: 2,
          localIdentName: '[path][name]__[local]--[hash:base64:8]'
        }
      },
      'sass-loader?sourceMap'
    ]
  })
}

export default {
  rules: [
    jsRule,
    cssRule,
    sassRule
  ]
}