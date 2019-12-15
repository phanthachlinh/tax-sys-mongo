const path = require('path');
const nodeExternals = require('webpack-node-externals');
module.exports = {
  entry: './src/app.ts',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'server.mongo.js'
  },
  target: 'node',
  module:{
    rules:[
      {
      test: /\.ts?$/,
      use: 'ts-loader',
      exclude: [/node_modules/,/\.test.ts/],
      }
    ]
  },
  node: {
    fs: 'empty',
    net: 'empty'
  },
  externals: [nodeExternals()],
  mode: 'development'
}
