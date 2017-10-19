const path = require('path')
const webpack = require('webpack')
// const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin')

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, '/'),
    filename: 'gittoken-dashboard.dist.js'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['env', 'react', 'stage-0']
        }
      }, {
        test : /.json?$/,
        loader : "json-loader"
      }
    ]
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // }),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"development"'
    })
    // new ServiceWorkerWebpackPlugin({
    //   entry: path.join(__dirname, 'sw.js'),
    // })
  ]
}
