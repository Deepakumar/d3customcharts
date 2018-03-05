const path = require('path')
const webpack = require('webpack')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const paths = {
  src: path.join(__dirname, 'src'),
  dist: {root: path.join(__dirname, 'dist'), script:path.join(__dirname,'dist','script'), data:path.join(__dirname,'dist','data') },
  data: path.join(__dirname, 'data')
}

module.exports = {
  context: paths.src,
  entry: {
    chapter1:'./chapter1.js',
    commonstyle: './main.scss',
    scales: './scales.js',
    barchart: './barchart.js',
    shapes: './shapes.js',
    piechart: './piechart.js',
    piechart: './piechart.js',
    linechart: './linechart.js',
    linechartstack: './linechartstack.js',
    updateandexit: './updateandexit.js',
    generalupdatepattern: './generalupdatepattern.js',
    transitionbar: './transitionbar.js',
    transformcolor: './transformcolor.js',
    vendor: [
      'd3',
      'underscore'
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: paths.dist.script,
    publicPath: 'dist',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015', 'stage-0'] },
        }],
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract([
          'css-loader', 'sass-loader'
        ]),
      }
    ],
  },
  devServer: {
    contentBase: paths.dist,
    compress: true,
    port: '4800',
    stats: 'errors-only',
  },
  plugins: [
    new ExtractTextPlugin('../style/main.bundle.css',{
      allChunks: true,
    }),
    new CopyWebpackPlugin([
      {
        from: paths.data,
        to: paths.dist.data
      }
    ])
  ],
}
