
module.exports = {
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            remUnit: 192 // 设计稿尺寸/10
          })
        ]
      }
    }
},
  devServer: {
    port: 8484,
    // sockHost: 'http://10.0.88.160:8888',
    disableHostCheck: true,
    open: true,
    // host: "10.0.0.26:8484",
    host: "localhost",
    proxy: {
      '/api': {
        target: 'http://10.0.0.26:8088',
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
  },
  lintOnSave: false
}
