
const webpack = require('webpack');
const path = require('path');

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        mapboxgl: 'mapbox-gl',
      }),
    ],
  },
  // proxy API requests to Valet during development
  transpileDependencies: true,
  outputDir: (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging' )
    ? '../public'
    : `../${process.env.VUE_APP_BACKEND_FOLDER}/public`,
  devServer: {
    port: 4100,
    host: process.env.DOMAIN_NAME,
    proxy: {
      '^/api': {
        target: process.env.BASE_URL,
        changeOrigin: true,
      },
    },
  },

  indexPath:
    process.env.NODE_ENV === 'production'
      ? '../resources/views/index.blade.php'
      : '../resources/views/dev.blade.php',
  
  publicPath: ['staging', 'production'].includes(process.env.NODE_ENV)
    ? `${process.env.ASSET_URL}/`
    : '/',


  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jquery: 'jquery',
        'window.jQuery': 'jquery',
        jQuery: 'jquery',
      }),
    ]
  },
  chainWebpack: config => config.resolve.symlinks(false),
}