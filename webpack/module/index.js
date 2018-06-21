import ExtractTextPlugin from 'extract-text-webpack-plugin'

const jsRule = {
  test: /\.js[x]?$/,
  exclude: /(node_modules)/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        presets: ['env', 'react']
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
      'css-loader?minimize&modules&importLoaders=2&localIdentName=[name]__[local]___[contenthash:base64:5]', 
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