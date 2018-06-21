export default {
  splitChunks: {
    cacheGroups: {
      // 
      // Move modules that occur in multiple entry chunks to a new entry chunk (the commons chunk).
      // -----------------------------------------------------------------------------
      commons: {
        chunks: 'initial',
        test: /[\\/]node_modules[\\/]/,
        minChunks: 2, 
        maxInitialRequests: 5,
        minSize: 0,
        name: 'vendors'
      },
      vendor: {
        test: /node_modules/,
        chunks: 'initial',
        name: 'vendor',
        priority: 10,
        enforce: true
      }
    }
  },
  runtimeChunk: false
}
